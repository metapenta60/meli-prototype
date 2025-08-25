package daos

type ProductStatus string
type PaymentType string

const (
	ProductStatusNew           ProductStatus = "New"
	ProductStatusUsed          ProductStatus = "Used"
	ProductStatusAcondicionado ProductStatus = "Acondicionado"

	PaymentTypeCredit   PaymentType = "credit"
	PaymentTypeDebit    PaymentType = "debit"
	PaymentTypeOther    PaymentType = "other"
	PaymentTypeTransfer PaymentType = "transfer"
)
