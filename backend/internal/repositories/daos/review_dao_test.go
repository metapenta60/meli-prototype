package daos

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestReviewDAO_TableName(t *testing.T) {
	dao := &ReviewDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "reviews", tableName)
}

func TestReviewDAO_ToDomain_WithAllFields(t *testing.T) {
	createdAt := time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)
	dao := &ReviewDAO{
		ID:        "test-review-id",
		ProductID: "test-product-id",
		SellerID:  "test-seller-id",
		ItemID:    stringPtr("test-item-id"),
		Rating:    5,
		Content:   "Excellent product! Highly recommended.",
		CreatedAt: createdAt,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-review-id", result.ID)
	assert.Equal(t, 5, result.Rating)
	assert.Equal(t, "Excellent product! Highly recommended.", result.Content)
	assert.Equal(t, createdAt, result.CreatedAt)
}

func TestReviewDAO_ToDomain_WithMinRating(t *testing.T) {
	createdAt := time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)
	dao := &ReviewDAO{
		ID:        "test-review-id",
		ProductID: "test-product-id",
		SellerID:  "test-seller-id",
		ItemID:    nil,
		Rating:    1,
		Content:   "Poor quality product.",
		CreatedAt: createdAt,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-review-id", result.ID)
	assert.Equal(t, 1, result.Rating)
	assert.Equal(t, "Poor quality product.", result.Content)
	assert.Equal(t, createdAt, result.CreatedAt)
}

func TestReviewDAO_ToDomain_WithMaxRating(t *testing.T) {
	createdAt := time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)
	dao := &ReviewDAO{
		ID:        "test-review-id",
		ProductID: "test-product-id",
		SellerID:  "test-seller-id",
		ItemID:    stringPtr("test-item-id"),
		Rating:    5,
		Content:   "Perfect! Exceeds all expectations.",
		CreatedAt: createdAt,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-review-id", result.ID)
	assert.Equal(t, 5, result.Rating)
	assert.Equal(t, "Perfect! Exceeds all expectations.", result.Content)
	assert.Equal(t, createdAt, result.CreatedAt)
}

func TestReviewDAO_ToDomain_WithEmptyContent(t *testing.T) {
	createdAt := time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)
	dao := &ReviewDAO{
		ID:        "test-review-id",
		ProductID: "test-product-id",
		SellerID:  "test-seller-id",
		ItemID:    nil,
		Rating:    3,
		Content:   "",
		CreatedAt: createdAt,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-review-id", result.ID)
	assert.Equal(t, 3, result.Rating)
	assert.Equal(t, "", result.Content)
	assert.Equal(t, createdAt, result.CreatedAt)
}

func TestReviewsDAO_ToDomain(t *testing.T) {
	createdAt1 := time.Date(2024, 1, 15, 10, 30, 0, 0, time.UTC)
	createdAt2 := time.Date(2024, 1, 16, 14, 45, 0, 0, time.UTC)

	daos := ReviewsDAO{
		{
			ID:        "review-1",
			ProductID: "product-1",
			SellerID:  "seller-1",
			ItemID:    stringPtr("item-1"),
			Rating:    4,
			Content:   "Good product.",
			CreatedAt: createdAt1,
		},
		{
			ID:        "review-2",
			ProductID: "product-2",
			SellerID:  "seller-2",
			ItemID:    nil,
			Rating:    5,
			Content:   "Excellent product!",
			CreatedAt: createdAt2,
		},
	}

	result := daos.ToDomain()

	assert.NotNil(t, result)
	assert.Len(t, result, 2)
	assert.Equal(t, "review-1", result[0].ID)
	assert.Equal(t, "review-2", result[1].ID)
	assert.Equal(t, 4, result[0].Rating)
	assert.Equal(t, 5, result[1].Rating)
}

func TestReviewsDAO_ToDomain_Empty(t *testing.T) {
	daos := ReviewsDAO{}

	result := daos.ToDomain()

	assert.NotNil(t, result)
	assert.Len(t, result, 0)
}
