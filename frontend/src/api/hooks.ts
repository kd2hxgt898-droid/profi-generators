import { useMutation, useQuery } from '@tanstack/react-query';
import type {
  CollectionScenario,
  FaqItem,
  LeadInput,
  LeadResponse,
  Product,
  QuizAnswers,
  QuizRecommendation,
  Segment,
  Testimonial,
} from '@/types/api';
import { ApiError, apiGet, apiPost } from './client';
import {
  mockCollections,
  mockFaq,
  mockProducts,
  mockRecommend,
  mockTestimonials,
} from './mock';

type ProductsResponse = { items: ReadonlyArray<Product>; total: number };
type CollectionsResponse = { items: ReadonlyArray<CollectionScenario> };
type TestimonialsResponse = { items: ReadonlyArray<Testimonial> };
type FaqResponse = { items: ReadonlyArray<FaqItem> };
type RecommendResponse = {
  configurations: ReadonlyArray<QuizRecommendation>;
  note: string;
};

const safeApiGet = async <T>(
  path: string,
  fallback: T,
  params?: Record<string, string | undefined>,
): Promise<T> => {
  try {
    return await apiGet<T>(path, params);
  } catch (error) {
    if (
      error instanceof ApiError ||
      error instanceof TypeError ||
      error instanceof SyntaxError
    ) {
      return fallback;
    }
    throw error;
  }
};

export const useProducts = (filter?: { segment?: Segment; collection?: string }) =>
  useQuery({
    queryKey: ['products', filter ?? {}],
    queryFn: () => {
      const filtered = mockProducts.filter((product) => {
        if (filter?.segment && product.segment !== filter.segment) return false;
        if (filter?.collection && product.collection !== filter.collection) return false;
        return true;
      });
      return safeApiGet<ProductsResponse>(
        '/products',
        { items: filtered, total: filtered.length },
        { segment: filter?.segment, collection: filter?.collection },
      );
    },
  });

export const useCollections = (segment?: Segment) =>
  useQuery({
    queryKey: ['collections', segment],
    queryFn: () =>
      safeApiGet<CollectionsResponse>(
        '/collections',
        {
          items: segment
            ? mockCollections.filter((collection) => collection.segment === segment)
            : mockCollections,
        },
        { segment },
      ),
  });

export const useTestimonials = () =>
  useQuery({
    queryKey: ['testimonials'],
    queryFn: () =>
      safeApiGet<TestimonialsResponse>('/testimonials', { items: mockTestimonials }),
  });

export const useFaq = () =>
  useQuery({
    queryKey: ['faq'],
    queryFn: () => safeApiGet<FaqResponse>('/faq', { items: mockFaq }),
  });

export const useQuizRecommend = () =>
  useMutation({
    mutationFn: async (answers: QuizAnswers): Promise<RecommendResponse> => {
      try {
        return await apiPost<QuizAnswers, RecommendResponse>('/quiz/recommend', answers);
      } catch {
        return {
          configurations: mockRecommend(answers),
          note: 'Сгенерированный демо-расчёт',
        };
      }
    },
  });

export const useSubmitLead = () =>
  useMutation({
    mutationFn: async (input: LeadInput): Promise<LeadResponse> => {
      try {
        return await apiPost<LeadInput, LeadResponse>('/lead', input);
      } catch {
        return {
          id: crypto.randomUUID(),
          status: 'accepted' as const,
          created_at: new Date().toISOString(),
        };
      }
    },
  });
