package daos

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestTopSellerDAO_TableName(t *testing.T) {
	dao := &TopSellerDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "top_sellers", tableName)
}

func TestTopSellerDAO_ToDomain_WithAllFields(t *testing.T) {
	dao := &TopSellerDAO{
		ID:                    "test-top-seller-id",
		ProductID:             "test-product-id",
		Rating:                95.5,
		NeedToKnowDescription: "This seller has excellent reputation and fast shipping",
		Product: &ProductDAO{
			ID:    "test-product-id",
			Title: "Test Product",
		},
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-top-seller-id", result.ID)
	assert.Equal(t, 95.5, result.Rating)
	assert.Equal(t, "This seller has excellent reputation and fast shipping", result.NeedToKnowDescription)
}

func TestTopSellerDAO_ToDomain_WithMinRating(t *testing.T) {
	dao := &TopSellerDAO{
		ID:                    "test-top-seller-id",
		ProductID:             "test-product-id",
		Rating:                1.0,
		NeedToKnowDescription: "Minimum rating seller",
		Product:               nil,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-top-seller-id", result.ID)
	assert.Equal(t, 1.0, result.Rating)
	assert.Equal(t, "Minimum rating seller", result.NeedToKnowDescription)
}

func TestTopSellerDAO_ToDomain_WithMaxRating(t *testing.T) {
	dao := &TopSellerDAO{
		ID:                    "test-top-seller-id",
		ProductID:             "test-product-id",
		Rating:                100.0,
		NeedToKnowDescription: "Perfect rating seller",
		Product:               nil,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-top-seller-id", result.ID)
	assert.Equal(t, 100.0, result.Rating)
	assert.Equal(t, "Perfect rating seller", result.NeedToKnowDescription)
}

func TestTopSellerDAO_ToDomain_WithEmptyDescription(t *testing.T) {
	dao := &TopSellerDAO{
		ID:                    "test-top-seller-id",
		ProductID:             "test-product-id",
		Rating:                50.0,
		NeedToKnowDescription: "",
		Product:               nil,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-top-seller-id", result.ID)
	assert.Equal(t, 50.0, result.Rating)
	assert.Equal(t, "", result.NeedToKnowDescription)
}
