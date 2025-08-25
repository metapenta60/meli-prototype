package router

import (
	"meli-backend/internal/domain"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockItemService struct {
	mock.Mock
}

func (m *MockItemService) GetEnriched(id string) (*domain.Item, error) {
	args := m.Called(id)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*domain.Item), args.Error(1)
}

func TestNewRouter(t *testing.T) {
	mockService := &MockItemService{}
	deps := Deps{
		ItemService: mockService,
	}

	router := NewRouter(deps)

	assert.NotNil(t, router)
	assert.NotNil(t, router.engine)
	assert.Equal(t, deps, router.deps)
}

func TestRouter_Handler(t *testing.T) {
	mockService := &MockItemService{}
	deps := Deps{
		ItemService: mockService,
	}

	router := NewRouter(deps)
	handler := router.Handler()

	assert.NotNil(t, handler)
}

func TestRouter_HealthCheckHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	mockService := &MockItemService{}
	deps := Deps{
		ItemService: mockService,
	}

	router := NewRouter(deps)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/health", nil)

	router.engine.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "ok")
	assert.Contains(t, w.Body.String(), "Server is running")
}

func TestRouter_ItemHandler_GetByID(t *testing.T) {
	gin.SetMode(gin.TestMode)

	mockService := &MockItemService{}
	expectedItem := &domain.Item{
		ID:    "test-id",
		Title: "Test Item",
	}

	mockService.On("GetEnriched", "test-id").Return(expectedItem, nil)

	deps := Deps{
		ItemService: mockService,
	}

	router := NewRouter(deps)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/v1/items/test-id", nil)

	router.engine.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	mockService.AssertExpectations(t)
}

func TestRouter_ItemHandler_GetByID_Error(t *testing.T) {
	gin.SetMode(gin.TestMode)

	mockService := &MockItemService{}
	mockService.On("GetEnriched", "invalid-id").Return(nil, assert.AnError)

	deps := Deps{
		ItemService: mockService,
	}

	router := NewRouter(deps)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/v1/items/invalid-id", nil)

	router.engine.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
	mockService.AssertExpectations(t)
}

func TestRouter_NoRoute(t *testing.T) {
	gin.SetMode(gin.TestMode)

	mockService := &MockItemService{}
	deps := Deps{
		ItemService: mockService,
	}

	router := NewRouter(deps)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/nonexistent", nil)

	router.engine.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
	assert.Contains(t, w.Body.String(), "route not found")
}

func TestRouter_CorsMiddleware_Options(t *testing.T) {
	gin.SetMode(gin.TestMode)

	mockService := &MockItemService{}
	deps := Deps{
		ItemService: mockService,
	}

	router := NewRouter(deps)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("OPTIONS", "/api/v1/items/test-id", nil)

	router.engine.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNoContent, w.Code)
}

func TestRouter_CorsMiddleware_Get(t *testing.T) {
	gin.SetMode(gin.TestMode)

	mockService := &MockItemService{}
	deps := Deps{
		ItemService: mockService,
	}

	router := NewRouter(deps)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/health", nil)

	router.engine.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "*", w.Header().Get("Access-Control-Allow-Origin"))
	assert.Equal(t, "GET, POST, PUT, DELETE, OPTIONS", w.Header().Get("Access-Control-Allow-Methods"))
}
