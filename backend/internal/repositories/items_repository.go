package repositories

import (
	"fmt"
	"meli-backend/internal/domain"
	daos "meli-backend/internal/repositories/daos"
)

type ItemsRepository struct {
	dbWrapper *DbWrapper
}

func New(dbWrapper *DbWrapper) *ItemsRepository {
	return &ItemsRepository{
		dbWrapper: dbWrapper,
	}
}

func (r *ItemsRepository) GetEnriched(itemID string) (*domain.Item, error) {
	enrichedDAO, err := r.getEnrichedDAO(itemID)
	if err != nil {
		return nil, err
	}

	return enrichedDAO.ToDomain(), nil
}

func (r *ItemsRepository) getEnrichedDAO(itemID string) (*daos.ItemDAO, error) {
	var item daos.ItemDAO

	fmt.Printf("Attempting to get item with ID: %s\n", itemID)

	err := r.dbWrapper.DB.
		Preload("Price").
		Preload("UserProduct").
		Preload("UserProduct.Product").
		Preload("UserProduct.Product.Family").
		Preload("UserProduct.Product.AggregatedReview").
		Preload("UserProduct.Seller").
		Preload("UserProduct.Seller.Image").
		Preload("UserProduct.Product.PaymentGroup").
		Preload("UserProduct.Product.PaymentGroup.PaymentMethods").
		Preload("UserProduct.Product.PaymentGroup.PaymentMethods.Image").
		Preload("ItemImages").
		Preload("ItemImages.Image").
		Preload("Reviews").
		Preload("Questions").
		Where("item_id = ?", itemID).
		First(&item).Error

	if err != nil {
		fmt.Printf("Error getting item: %v\n", err)
		return nil, err
	}

	fmt.Printf("Successfully retrieved item: %+v\n", item)
	return &item, nil
}
