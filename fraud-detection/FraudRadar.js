module.exports = class FraudRadar {
  /*
  @param lines: array of arrays with data from files
  */
  constructor (lines) {
    this.orders = []
    for (let line of lines) {
      let order = {
        orderId: line[0] !== undefined ? Number(line[0]) : 0,
        dealId: line[1] !== undefined ? Number(line[1]) : 0,
        email: line[2] !== undefined ? line[2].toLowerCase() : '',
        street: line[3] !== undefined ? line[3].toLowerCase() : '',
        city: line[4] !== undefined ? line[4].toLowerCase() : '',
        state: line[5] !== undefined ? line[5].toLowerCase() : '',
        zipCode: line[6] !== undefined ? line[6] : '',
        creditCard: line[7] !== undefined ? line[7] : ''
      }
      this.orders.push(order)
    }
  }

  normalizeEmail (email) {
    if (email !== undefined && email !== '') {
      let aux = email.split('@')
      let atIndex = aux[0].indexOf('+')
      aux[0] = atIndex < 0 ? aux[0].replace('.', '') : aux[0].replace('.', '').substring(0, atIndex - 1)
      return aux.join('@')
    } else {
      return ''
    }
  }

  normalizeStreet (street) {
    if (street !== undefined && street !== '') {
      return street.replace('st.', 'street').replace('rd.', 'road')
    } else {
      return ''
    }
  }

  normalizeState (state) {
    if (state !== undefined && state !== '') {
      return state.replace('il', 'illinois').replace('ca', 'california').replace('ny', 'new york').replace('cl', 'colorado')
    } else {
      return ''
    }
  }

  normalize () {
    for (let order of this.orders) {
      order.email = this.normalizeEmail(order.email)
      order.street = this.normalizeStreet(order.street)
      order.state = this.normalizeState(order.state)
    }
  }

  compareObjects (current, next) {
    let isFraudulent = false
    if (current.dealId === next.dealId &&
      current.email === next.email &&
      current.state === next.state &&
      current.zipCode === next.zipCode &&
      current.street === next.street &&
      current.city === next.city &&
      current.creditCard !== next.creditCard && current.creditCard !== next.creditCard) {
      isFraudulent = true
    }
    return isFraudulent
  }

  checkFraud () {
    let fraudResults = []
    this.normalize()
    for (let i = 0; i < this.orders.length; i++) {
      let current = this.orders[i]
      let isFraudulent = false

      for (let j = i + 1; j < this.orders.length; j++) {
        isFraudulent = this.compareObjects(current, this.orders[j])
        if (isFraudulent) {
          fraudResults.push({
            isFraudulent: true,
            orderId: this.orders[j].orderId
          })
        }
        isFraudulent = false
      }
    }

    return fraudResults
  }
}
