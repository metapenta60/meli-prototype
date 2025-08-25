package daos

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAggregatedReviewDAO_TableName(t *testing.T) {
	dao := &AggregatedReviewDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "aggregated_reviews", tableName)
}

func TestAggregatedReviewDAO_ToDomain_WithAllFields(t *testing.T) {
	dao := &AggregatedReviewDAO{
		ID:          "test-aggregated-review-id",
		ProductID:   "test-product-id",
		RatingValue: 4.5,
		RatingCount: 150,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-aggregated-review-id", result.ID)
	assert.Equal(t, 4.5, result.RatingValue)
	assert.Equal(t, 150, result.RatingCount)
}

func TestAggregatedReviewDAO_ToDomain_WithZeroValues(t *testing.T) {
	dao := &AggregatedReviewDAO{
		ID:          "test-aggregated-review-id",
		ProductID:   "test-product-id",
		RatingValue: 0.0,
		RatingCount: 0,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-aggregated-review-id", result.ID)
	assert.Equal(t, 0.0, result.RatingValue)
	assert.Equal(t, 0, result.RatingCount)
}

func TestAggregatedReviewDAO_ToDomain_WithHighRating(t *testing.T) {
	dao := &AggregatedReviewDAO{
		ID:          "test-aggregated-review-id",
		ProductID:   "test-product-id",
		RatingValue: 5.0,
		RatingCount: 1000,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-aggregated-review-id", result.ID)
	assert.Equal(t, 5.0, result.RatingValue)
	assert.Equal(t, 1000, result.RatingCount)
}
