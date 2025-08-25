package service

import (
	"meli-backend/internal/domain"
)

type ItemServiceInterface interface {
	GetEnriched(itemID string) (*domain.Item, error)
}

type ItemService struct {
	itemsRepository ItemServiceInterface
}

func NewItemService(itemsRepository ItemServiceInterface) *ItemService {
	return &ItemService{itemsRepository: itemsRepository}
}

func (s *ItemService) GetEnriched(itemID string) (*domain.Item, error) {
	return s.itemsRepository.GetEnriched(itemID)
}
