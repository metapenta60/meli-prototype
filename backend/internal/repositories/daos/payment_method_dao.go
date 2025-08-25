package daos

import (
	"meli-backend/internal/domain"

	"github.com/samber/lo"
)

type PaymentMethodsDAO []PaymentMethodDAO

type PaymentMethodDAO struct {
	ID                     string      `gorm:"type:uuid;primaryKey;column:id"`
	GroupID                string      `gorm:"type:uuid;column:group_id;not null"`
	NumberOfInstallments   int         `gorm:"column:number_of_installments"`
	InterestRatePercentage float64     `gorm:"type:numeric(5,2);column:interest_rate_percentage"`
	Type                   PaymentType `gorm:"type:payment_type_enum;column:type;not null"`
	ImageID                *string     `gorm:"type:uuid;column:image_id"`

	Image *ImageDAO `gorm:"foreignKey:ImageID"`
}

func (PaymentMethodDAO) TableName() string {
	return "payment_methods"
}

func (p *PaymentMethodDAO) ToDomain() *domain.PaymentMethod {
	var image domain.Image
	if p.Image != nil {
		image = *p.Image.ToDomain()
	}

	return &domain.PaymentMethod{
		ID:                     p.ID,
		NumberOfInstallments:   p.NumberOfInstallments,
		InterestRatePercentage: p.InterestRatePercentage,
		Type:                   string(p.Type),
		Image:                  image,
	}
}

func (p PaymentMethodsDAO) ToDomain() []domain.PaymentMethod {
	return lo.Map(p, func(item PaymentMethodDAO, _ int) domain.PaymentMethod {
		return *item.ToDomain()
	})
}
