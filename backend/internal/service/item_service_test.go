package service

import (
	"errors"
	"meli-backend/internal/domain"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockItemsRepository struct {
	mock.Mock
}

func (m *MockItemsRepository) GetEnriched(itemID string) (*domain.Item, error) {
	args := m.Called(itemID)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*domain.Item), args.Error(1)
}

func TestNewItemService(t *testing.T) {
	mockRepo := &MockItemsRepository{}
	service := NewItemService(mockRepo)

	assert.NotNil(t, service)
	assert.Equal(t, mockRepo, service.itemsRepository)
}

func TestItemService_GetEnriched_Success(t *testing.T) {
	mockRepo := &MockItemsRepository{}
	service := NewItemService(mockRepo)

	expectedItem := &domain.Item{
		ID:    "test-id",
		Title: "Test Item",
	}

	mockRepo.On("GetEnriched", "test-id").Return(expectedItem, nil)

	result, err := service.GetEnriched("test-id")

	assert.NoError(t, err)
	assert.Equal(t, expectedItem, result)
	mockRepo.AssertExpectations(t)
}

func TestItemService_GetEnriched_Error(t *testing.T) {
	mockRepo := &MockItemsRepository{}
	service := NewItemService(mockRepo)

	expectedError := errors.New("database error")

	mockRepo.On("GetEnriched", "test-id").Return(nil, expectedError)

	result, err := service.GetEnriched("test-id")

	assert.Error(t, err)
	assert.Nil(t, result)
	assert.Equal(t, expectedError, err)
	mockRepo.AssertExpectations(t)
}
