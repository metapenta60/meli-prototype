package daos

import "meli-backend/internal/domain"

// PriceDAO represents the prices table
type PriceDAO struct {
	ID             string  `gorm:"type:uuid;primaryKey;column:id"`
	Value          float64 `gorm:"type:numeric(18,2);column:value;not null"`
	CurrencySymbol string  `gorm:"column:currency_symbol"`
	CurrencyID     string  `gorm:"column:currency_id"`
}

func (PriceDAO) TableName() string {
	return "prices"
}

func (p *PriceDAO) ToDomain() *domain.Price {
	return &domain.Price{
		ID:             p.ID,
		Value:          p.Value,
		CurrencySymbol: p.CurrencySymbol,
		CurrencyID:     p.CurrencyID,
	}
}
