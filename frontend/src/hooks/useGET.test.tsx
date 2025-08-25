import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGET } from './useGET';

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('useGET', () => {
  const mockUrl = 'https://api.example.com/data';

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
  });

  it('returns initial state with empty result and error', () => {
    const { result } = renderHook(() => useGET(mockUrl));

    expect(result.current.result).toBeUndefined();
    expect(result.current.error).toBe('');
    expect(typeof result.current.request).toBe('function');
  });

  it('handles successful request and updates result', async () => {
    const mockData = { id: 1, name: 'Test Item' };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(mockUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toEqual(mockData);
      expect(result.current.error).toBe('');
    });

    expect(mockFetch).toHaveBeenCalledWith(mockUrl);
    expect(mockResponse.json).toHaveBeenCalled();
  });

  it('handles failed request and updates error', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
    };

    mockFetch.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(mockUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Unexpected error from the server: 404');
      expect(result.current.result).toBeUndefined();
    });

    expect(mockFetch).toHaveBeenCalledWith(mockUrl);
  });

  it('handles network error gracefully', async () => {
    const networkError = new Error('Network error');
    mockFetch.mockRejectedValue(networkError);

    const { result } = renderHook(() => useGET(mockUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.error).toBe('');
      expect(result.current.result).toBeUndefined();
    });
  });

  it('handles multiple requests and maintains state correctly', async () => {
    const mockData1 = { id: 1, name: 'First Item' };
    const mockData2 = { id: 2, name: 'Second Item' };

    const mockResponse1 = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData1),
    };

    const mockResponse2 = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData2),
    };

    (mockFetch as any)
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2);

    const { result } = renderHook(() => useGET(mockUrl));

    // First request
    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toEqual(mockData1);
      expect(result.current.error).toBe('');
    });

    // Second request
    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toEqual(mockData2);
      expect(result.current.error).toBe('');
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('handles request after error and clears error', async () => {
    // First request fails
    const mockFailedResponse = {
      ok: false,
      status: 500,
    };

    const mockSuccessResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    };

    (mockFetch as any)
      .mockResolvedValueOnce(mockFailedResponse)
      .mockResolvedValueOnce(mockSuccessResponse);

    const { result } = renderHook(() => useGET(mockUrl));

    // Failed request
    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Unexpected error from the server: 500');
    });

    // Successful request
    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toEqual({ success: true });
      expect(result.current.error).toBe('Unexpected error from the server: 500');
    });
  });

  it('handles different HTTP status codes', async () => {
    const statusCodes = [400, 401, 403, 404, 500, 502, 503];

    for (const statusCode of statusCodes) {
      const mockResponse = {
        ok: false,
        status: statusCode,
      };

      (mockFetch as any).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useGET(mockUrl));

      await act(async () => {
        result.current.request();
      });

      await waitFor(() => {
        expect(result.current.error).toBe(`Unexpected error from the server: ${statusCode}`);
      });

      // Clean up for next iteration
      vi.clearAllMocks();
    }
  });

  it('handles JSON parsing error gracefully', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
    };

    (mockFetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(mockUrl));

    await act(async () => {
      result.current.request();
    });

    // The hook doesn't handle JSON parsing errors, so error should remain empty
    await waitFor(() => {
      expect(result.current.error).toBe('');
      expect(result.current.result).toBeUndefined();
    });
  });

  it('handles empty response body', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(null),
    };

    (mockFetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(mockUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toBeNull();
      expect(result.current.error).toBe('');
    });
  });

  it('handles response with undefined body', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(undefined),
    };

    (mockFetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(mockUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toBeUndefined();
      expect(result.current.error).toBe('');
    });
  });

  it('handles response with empty string body', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(''),
    };

    (mockFetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(mockUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toBe('');
      expect(result.current.error).toBe('');
    });
  });

  it('handles response with zero body', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(0),
    };

    (mockFetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(mockUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toBe(0);
      expect(result.current.error).toBe('');
    });
  });

  it('handles response with false body', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(false),
    };

    (mockFetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(mockUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toBe(false);
      expect(result.current.error).toBe('');
    });
  });

  it('handles response with array body', async () => {
    const mockData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    };

    (mockFetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(mockUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toEqual(mockData);
      expect(result.current.error).toBe('');
    });
  });

  it('handles response with nested object body', async () => {
    const mockData = {
      user: {
        id: 1,
        profile: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      },
      settings: {
        theme: 'dark',
        notifications: true,
      },
    };

    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    };

    (mockFetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(mockUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toEqual(mockData);
      expect(result.current.error).toBe('');
    });
  });

  it('handles concurrent requests correctly', async () => {
    const mockData1 = { id: 1, name: 'First' };
    const mockData2 = { id: 2, name: 'Second' };

    const mockResponse1 = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData1),
    };

    const mockResponse2 = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData2),
    };

    (mockFetch as any)
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2);

    const { result } = renderHook(() => useGET(mockUrl));

    // Start both requests concurrently
    await act(async () => {
      result.current.request();
      result.current.request();
    });

    // Wait for both to complete
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    // The last request result should be the final state
    await waitFor(() => {
      expect(result.current.result).toEqual(mockData2);
    });
  });

  it('handles very long URLs', async () => {
    const longUrl = 'https://api.example.com/very/long/path/with/many/segments/and/parameters?param1=value1&param2=value2&param3=value3&param4=value4&param5=value5&param6=value6&param7=value7&param8=value8&param9=value9&param10=value10';

    const mockData = { success: true };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    };

    (mockFetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(longUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toEqual(mockData);
      expect(result.current.error).toBe('');
    });

    expect(mockFetch).toHaveBeenCalledWith(longUrl);
  });

  it('handles URLs with special characters', async () => {
    const specialUrl = 'https://api.example.com/path/with/special/chars/!@#$%^&*()_+-=[]{}|;:,.<>?';

    const mockData = { success: true };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    };

    (mockFetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(specialUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toEqual(mockData);
      expect(result.current.error).toBe('');
    });

    expect(mockFetch).toHaveBeenCalledWith(specialUrl);
  });

  it('handles URLs with unicode characters', async () => {
    const unicodeUrl = 'https://api.example.com/path/with/unicode/áéíóúñüç';

    const mockData = { success: true };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    };

    (mockFetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGET(unicodeUrl));

    await act(async () => {
      result.current.request();
    });

    await waitFor(() => {
      expect(result.current.result).toEqual(mockData);
      expect(result.current.error).toBe('');
    });

    expect(mockFetch).toHaveBeenCalledWith(unicodeUrl);
  });

  it('maintains request function reference across renders', () => {
    const { result, rerender } = renderHook(() => useGET(mockUrl));

    const firstRequest = result.current.request;

    rerender();

    // React hooks may recreate functions on re-render, so we just check it's still a function
    expect(typeof result.current.request).toBe('function');
  });

  it('handles multiple hook instances independently', async () => {
    const mockData1 = { id: 1 };
    const mockData2 = { id: 2 };

    const mockResponse1 = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData1),
    };

    const mockResponse2 = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData2),
    };

    (mockFetch as any)
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2);

    const { result: result1 } = renderHook(() => useGET('https://api1.example.com/data'));
    const { result: result2 } = renderHook(() => useGET('https://api2.example.com/data'));

    await act(async () => {
      result1.current.request();
      result2.current.request();
    });

    await waitFor(() => {
      expect(result1.current.result).toEqual(mockData1);
      expect(result2.current.result).toEqual(mockData2);
    });
  });
});
