package dto

type PaymentInfoDTO struct {
	Installments   int                `json:"installments"`
	PaymentMethods []PaymentMethodDTO `json:"paymentMethods"`
}
