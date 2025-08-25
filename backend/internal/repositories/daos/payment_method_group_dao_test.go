package daos

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPaymentMethodGroupDAO_TableName(t *testing.T) {
	dao := &PaymentMethodGroupDAO{}
	tableName := dao.TableName()

	assert.Equal(t, "payment_method_groups", tableName)
}

func TestPaymentMethodGroupDAO_ToDomain_WithPaymentMethods(t *testing.T) {
	dao := &PaymentMethodGroupDAO{
		ID: "test-payment-group-id",
		PaymentMethods: PaymentMethodsDAO{
			{
				ID:                     "method-1",
				GroupID:                "test-payment-group-id",
				NumberOfInstallments:   3,
				InterestRatePercentage: 10.0,
				Type:                   "credit_card",
			},
			{
				ID:                     "method-2",
				GroupID:                "test-payment-group-id",
				NumberOfInstallments:   6,
				InterestRatePercentage: 15.0,
				Type:                   "debit_card",
			},
		},
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-payment-group-id", result.ID)
	assert.NotNil(t, result.PaymentMethods)
	assert.Len(t, result.PaymentMethods, 2)
}

func TestPaymentMethodGroupDAO_ToDomain_WithoutPaymentMethods(t *testing.T) {
	dao := &PaymentMethodGroupDAO{
		ID:             "test-payment-group-id",
		PaymentMethods: PaymentMethodsDAO{},
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-payment-group-id", result.ID)
	assert.NotNil(t, result.PaymentMethods)
	assert.Len(t, result.PaymentMethods, 0)
}

func TestPaymentMethodGroupDAO_ToDomain_WithSinglePaymentMethod(t *testing.T) {
	dao := &PaymentMethodGroupDAO{
		ID: "test-payment-group-id",
		PaymentMethods: PaymentMethodsDAO{
			{
				ID:                     "method-1",
				GroupID:                "test-payment-group-id",
				NumberOfInstallments:   12,
				InterestRatePercentage: 0.0,
				Type:                   "cash",
			},
		},
	}

	result := dao.ToDomain()

	assert.NotNil(t, result)
	assert.Equal(t, "test-payment-group-id", result.ID)
	assert.NotNil(t, result.PaymentMethods)
	assert.Len(t, result.PaymentMethods, 1)
	assert.Equal(t, "method-1", result.PaymentMethods[0].ID)
}
