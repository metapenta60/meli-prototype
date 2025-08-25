package daos

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestItemDAO_TableName(t *testing.T) {
	dao := &ItemDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "items", tableName)
}

func TestItemDAO_ToDomain(t *testing.T) {
	dao := &ItemDAO{
		ItemID:            "test-item-id",
		UserProductID:     "test-user-product-id",
		Title:             "Test Item Title",
		Description:       "Test Item Description",
		AvailableQuantity: 10,
		ProductStatus:     "active",
		PriceIDFK:         "test-price-id",
		UserProduct: &UserProductDAO{
			ID: "test-user-product-id",
		},
		Price: &PriceDAO{
			ID: "test-price-id",
		},
		ItemImages: ItemImagesDAO{},
		Reviews:    ReviewsDAO{},
		Questions:  QuestionsDAO{},
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-item-id", result.ID)
	assert.Equal(t, "Test Item Title", result.Title)
	assert.Equal(t, "Test Item Description", result.Description)
	assert.Equal(t, 10, result.AvailableQuantity)
	assert.Equal(t, "active", result.ProductStatus)
	assert.NotNil(t, result.UserProduct)
	assert.NotNil(t, result.Price)
	assert.NotNil(t, result.ItemImages)
	assert.NotNil(t, result.Reviews)
	assert.NotNil(t, result.Questions)
}

func TestItemDAO_ToDomain_WithNilRelationships(t *testing.T) {
	dao := &ItemDAO{
		ItemID:            "test-item-id",
		UserProductID:     "test-user-product-id",
		Title:             "Test Item Title",
		Description:       "Test Item Description",
		AvailableQuantity: 5,
		ProductStatus:     "inactive",
		PriceIDFK:         "test-price-id",
		UserProduct:       nil,
		Price:             nil,
		ItemImages:        ItemImagesDAO{},
		Reviews:           ReviewsDAO{},
		Questions:         QuestionsDAO{},
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-item-id", result.ID)
	assert.Equal(t, "Test Item Title", result.Title)
	assert.Equal(t, "Test Item Description", result.Description)
	assert.Equal(t, 5, result.AvailableQuantity)
	assert.Equal(t, "inactive", result.ProductStatus)
	assert.NotNil(t, result.ItemImages)
	assert.NotNil(t, result.Reviews)
	assert.NotNil(t, result.Questions)
}
