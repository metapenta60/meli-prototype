package daos

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPaymentMethodDAO_TableName(t *testing.T) {
	dao := &PaymentMethodDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "payment_methods", tableName)
}

func TestPaymentMethodDAO_ToDomain_WithAllFields(t *testing.T) {
	dao := &PaymentMethodDAO{
		ID:                     "test-payment-method-id",
		GroupID:                "test-group-id",
		NumberOfInstallments:   12,
		InterestRatePercentage: 15.5,
		Type:                   "credit_card",
		ImageID:                stringPtr("test-image-id"),
		Image: &ImageDAO{
			ID: "test-image-id",
		},
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-payment-method-id", result.ID)
	assert.Equal(t, 12, result.NumberOfInstallments)
	assert.Equal(t, 15.5, result.InterestRatePercentage)
	assert.Equal(t, "credit_card", result.Type)
	assert.NotNil(t, result.Image)
}

func TestPaymentMethodDAO_ToDomain_WithNilImage(t *testing.T) {
	dao := &PaymentMethodDAO{
		ID:                     "test-payment-method-id",
		GroupID:                "test-group-id",
		NumberOfInstallments:   6,
		InterestRatePercentage: 0.0,
		Type:                   "debit_card",
		ImageID:                nil,
		Image:                  nil,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-payment-method-id", result.ID)
	assert.Equal(t, 6, result.NumberOfInstallments)
	assert.Equal(t, 0.0, result.InterestRatePercentage)
	assert.Equal(t, "debit_card", result.Type)
	assert.NotNil(t, result.Image)
}

func TestPaymentMethodDAO_ToDomain_WithZeroInstallments(t *testing.T) {
	dao := &PaymentMethodDAO{
		ID:                     "test-payment-method-id",
		GroupID:                "test-group-id",
		NumberOfInstallments:   0,
		InterestRatePercentage: 0.0,
		Type:                   "cash",
		ImageID:                nil,
		Image:                  nil,
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-payment-method-id", result.ID)
	assert.Equal(t, 0, result.NumberOfInstallments)
	assert.Equal(t, 0.0, result.InterestRatePercentage)
	assert.Equal(t, "cash", result.Type)
	assert.NotNil(t, result.Image)
}

func TestPaymentMethodsDAO_ToDomain(t *testing.T) {
	daos := PaymentMethodsDAO{
		{
			ID:                     "method-1",
			GroupID:                "group-1",
			NumberOfInstallments:   3,
			InterestRatePercentage: 10.0,
			Type:                   "credit_card",
		},
		{
			ID:                     "method-2",
			GroupID:                "group-2",
			NumberOfInstallments:   6,
			InterestRatePercentage: 15.0,
			Type:                   "debit_card",
		},
	}

	result := daos.ToDomain()

	assert.NotNil(t, result)
	assert.Len(t, result, 2)
	assert.Equal(t, "method-1", result[0].ID)
	assert.Equal(t, "method-2", result[1].ID)
	assert.Equal(t, 3, result[0].NumberOfInstallments)
	assert.Equal(t, 6, result[1].NumberOfInstallments)
}

func TestPaymentMethodsDAO_ToDomain_Empty(t *testing.T) {
	daos := PaymentMethodsDAO{}

	result := daos.ToDomain()

	assert.NotNil(t, result)
	assert.Len(t, result, 0)
}
