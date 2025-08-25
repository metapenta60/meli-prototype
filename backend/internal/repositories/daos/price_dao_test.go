package daos

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPriceDAO_TableName(t *testing.T) {
	dao := &PriceDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "prices", tableName)
}

func TestPriceDAO_ToDomain_WithAllFields(t *testing.T) {
	dao := &PriceDAO{
		ID:             "test-price-id",
		Value:          99.99,
		CurrencySymbol: "$",
		CurrencyID:     "USD",
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-price-id", result.ID)
	assert.Equal(t, 99.99, result.Value)
	assert.Equal(t, "$", result.CurrencySymbol)
	assert.Equal(t, "USD", result.CurrencyID)
}

func TestPriceDAO_ToDomain_WithZeroValue(t *testing.T) {
	dao := &PriceDAO{
		ID:             "test-price-id",
		Value:          0.0,
		CurrencySymbol: "",
		CurrencyID:     "",
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-price-id", result.ID)
	assert.Equal(t, 0.0, result.Value)
	assert.Equal(t, "", result.CurrencySymbol)
	assert.Equal(t, "", result.CurrencyID)
}

func TestPriceDAO_ToDomain_WithNegativeValue(t *testing.T) {
	dao := &PriceDAO{
		ID:             "test-price-id",
		Value:          -50.0,
		CurrencySymbol: "€",
		CurrencyID:     "EUR",
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-price-id", result.ID)
	assert.Equal(t, -50.0, result.Value)
	assert.Equal(t, "€", result.CurrencySymbol)
	assert.Equal(t, "EUR", result.CurrencyID)
}
