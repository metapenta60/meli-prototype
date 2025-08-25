package daos

import (
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestProductDAO_TableName(t *testing.T) {
	dao := &ProductDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "products", tableName)
}

func TestProductDAO_ToDomain_WithAllRelationships(t *testing.T) {
	dao := &ProductDAO{
		ID:             "test-product-id",
		Title:          "Test Product",
		Model:          "Test Model",
		MainSpec:       json.RawMessage(`[{"key": "value"}]`),
		SecondarySpec:  json.RawMessage(`[{"key2": "value2"}]`),
		FamilyID:       stringPtr("test-family-id"),
		PaymentGroupID: stringPtr("test-payment-group-id"),
		Family: &FamilyDAO{
			FamilyID: "test-family-id",
		},
		PaymentGroup: &PaymentMethodGroupDAO{
			ID: "test-payment-group-id",
		},
		TopSeller: &TopSellerDAO{
			ID: "test-top-seller-id",
		},
		AggregatedReview: &AggregatedReviewDAO{
			ID: "test-aggregated-review-id",
		},
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-product-id", result.ID)
	assert.Equal(t, "Test Product", result.Title)
	assert.Equal(t, "Test Model", result.Model)
	assert.NotNil(t, result.MainSpec)
	assert.NotNil(t, result.SecondarySpec)
	assert.NotNil(t, result.Family)
	assert.NotNil(t, result.PaymentGroup)
	assert.NotNil(t, result.TopSeller)
	assert.NotNil(t, result.AggregatedReview)
}

func TestProductDAO_ToDomain_WithNilRelationships(t *testing.T) {
	dao := &ProductDAO{
		ID:               "test-product-id",
		Title:            "Test Product",
		Model:            "Test Model",
		MainSpec:         json.RawMessage(`[{"key": "value"}]`),
		SecondarySpec:    json.RawMessage(`[{"key2": "value2"}]`),
		FamilyID:         nil,
		PaymentGroupID:   nil,
		Family:           nil,
		PaymentGroup:     nil,
		TopSeller:        nil,
		AggregatedReview: nil,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-product-id", result.ID)
	assert.Equal(t, "Test Product", result.Title)
	assert.Equal(t, "Test Model", result.Model)
	assert.NotNil(t, result.MainSpec)
	assert.NotNil(t, result.SecondarySpec)
	assert.NotNil(t, result.Family)
	assert.NotNil(t, result.PaymentGroup)
	assert.Nil(t, result.TopSeller)
	assert.NotNil(t, result.AggregatedReview)
}

func TestProductDAO_ToDomain_WithInvalidJSON(t *testing.T) {
	dao := &ProductDAO{
		ID:             "test-product-id",
		Title:          "Test Product",
		Model:          "Test Model",
		MainSpec:       json.RawMessage(`invalid json`),
		SecondarySpec:  json.RawMessage(`invalid json`),
		FamilyID:       nil,
		PaymentGroupID: nil,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-product-id", result.ID)
	assert.Equal(t, "Test Product", result.Title)
	assert.Equal(t, "Test Model", result.Model)
	assert.Nil(t, result.MainSpec)
	assert.Nil(t, result.SecondarySpec)
}

func TestProductDAO_ToDomain_WithEmptyJSON(t *testing.T) {
	dao := &ProductDAO{
		ID:             "test-product-id",
		Title:          "Test Product",
		Model:          "Test Model",
		MainSpec:       json.RawMessage(`[]`),
		SecondarySpec:  json.RawMessage(`[]`),
		FamilyID:       nil,
		PaymentGroupID: nil,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-product-id", result.ID)
	assert.Equal(t, "Test Product", result.Title)
	assert.Equal(t, "Test Model", result.Model)
	assert.NotNil(t, result.MainSpec)
	assert.NotNil(t, result.SecondarySpec)
}

// Helper function to create string pointers
func stringPtr(s string) *string {
	return &s
}
