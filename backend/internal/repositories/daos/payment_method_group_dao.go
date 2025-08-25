package daos

import "meli-backend/internal/domain"

type PaymentMethodGroupsDAO []PaymentMethodGroupDAO

type PaymentMethodGroupDAO struct {
	ID string `gorm:"type:uuid;primaryKey;column:id"`

	PaymentMethods PaymentMethodsDAO `gorm:"foreignKey:GroupID"`
}

func (PaymentMethodGroupDAO) TableName() string {
	return "payment_method_groups"
}

func (p *PaymentMethodGroupDAO) ToDomain() *domain.PaymentGroup {
	return &domain.PaymentGroup{
		ID:             p.ID,
		PaymentMethods: p.PaymentMethods.ToDomain(),
	}
}
