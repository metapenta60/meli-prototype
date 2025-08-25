package daos

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUserProductDAO_TableName(t *testing.T) {
	dao := &UserProductDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "user_products", tableName)
}

func TestUserProductDAO_ToDomain_WithAllRelationships(t *testing.T) {
	dao := &UserProductDAO{
		ID:        "test-user-product-id",
		ProductID: "test-product-id",
		SellerID:  "test-seller-id",
		SKU:       "TEST-SKU-001",
		Product: &ProductDAO{
			ID:    "test-product-id",
			Title: "Test Product",
		},
		Seller: &SellerDAO{
			SellerID: "test-seller-id",
			Name:     "Test Seller",
		},
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-user-product-id", result.ID)
	assert.Equal(t, "TEST-SKU-001", result.SKU)
	assert.NotNil(t, result.Product)
	assert.NotNil(t, result.Seller)
}

func TestUserProductDAO_ToDomain_WithNilRelationships(t *testing.T) {
	dao := &UserProductDAO{
		ID:        "test-user-product-id",
		ProductID: "test-product-id",
		SellerID:  "test-seller-id",
		SKU:       "TEST-SKU-002",
		Product:   nil,
		Seller:    nil,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-user-product-id", result.ID)
	assert.Equal(t, "TEST-SKU-002", result.SKU)
	assert.NotNil(t, result.Product)
	assert.NotNil(t, result.Seller)
}

func TestUserProductDAO_ToDomain_WithEmptySKU(t *testing.T) {
	dao := &UserProductDAO{
		ID:        "test-user-product-id",
		ProductID: "test-product-id",
		SellerID:  "test-seller-id",
		SKU:       "",
		Product:   nil,
		Seller:    nil,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-user-product-id", result.ID)
	assert.Equal(t, "", result.SKU)
	assert.NotNil(t, result.Product)
	assert.NotNil(t, result.Seller)
}
