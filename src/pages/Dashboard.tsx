//Transaction ID, Date, Description, Amount (in USD)
import { useEffect, useMemo, useState } from 'react';
import data from './mockData';

import _ from 'lodash'

interface Payment {
  id: number,
  date: number,
  description: string,
  amount: number
}


const Dashboard = () => {

const [dataSorted, setDataSorted] = useState<Payment[]>([])
const [filters, setFilters] = useState({});
const [dateFilter, setDateFilter] = useState('')
const [sort, setSort] = useState<{sortBy: string, direction: any }>({sortBy: '', direction: 'asc'})

const payments: Payment[] = useMemo(() => {
    return data;
}, [])

const handleSort = (value: string) => {
  setSort((prev) => ({
    sortBy: value, 
    direction: prev.direction === 'asc' ? 'desc' : 'asc'
    })
    )
}

useEffect(() => {
  setDataSorted(payments)
}, [payments])


useEffect(() => {
  const newPayments = _.orderBy(payments, [sort.sortBy], [sort.direction])
  setDataSorted(newPayments);
  
}, [payments, sort])

const handlerFilterDate = (value: any) => {
  console.log(value.target.value)
  const input = value.target.value
  const newPayments = payments.filter((item) => item.date === parseInt(input))
  if(newPayments.length) {
    setDataSorted(newPayments)
  } else {
    setDataSorted(payments)
  }
  setDateFilter(input)
}

  if (!data) return <p>There was an error</p>



  return (
  <>
    <h1>
      Payments
    </h1>

    <div>
      <input type="text" value={dateFilter} onChange={handlerFilterDate}/>
    </div>

    <table>
      <thead>
        <tr>
          <th>Transaction ID <span><button onClick={() => handleSort('id')}>x</button></span></th>
          <th>Date <span><button onClick={() => handleSort('date')}>x</button></span></th>
          <th>Description <span><button onClick={() => handleSort('description')}>x</button></span></th>
          <th>Amount <span><button onClick={() => handleSort('amount')}>x</button></span></th>
        </tr>
      </thead>
      <tbody>
        {
          dataSorted.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>{`USD ${item.amount}`}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </>

    )
}

export default Dashboard