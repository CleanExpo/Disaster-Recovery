'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState } from 'react';
import { DollarSign, TrendingUp, Download, Calendar, Filter, ArrowUp, ArrowDown, CreditCard } from 'lucide-react';

function ContractorPortalEarningsPageOriginal() {
  const [timeRange, setTimeRange] = useState('month');
  const [filterStatus, setFilterStatus] = useState('all');

  const earningsSummary = {
    totalEarnings: '$125,450',
    thisMonth: '$38,250',
    pending: '$12,500',
    available: '$25,750'
  };

  const transactions = [
    {
      id: 'PAY-2024-001',
      date: '2024-03-15',
      job: 'JOB-2024-095 - Water Damage Restoration',
      client: 'Sarah Johnson',
      amount: '$15,000',
      status: 'paid',
      method: 'Bank Transfer'
    },
    {
      id: 'PAY-2024-002',
      date: '2024-03-14',
      job: 'JOB-2024-093 - Fire Damage Cleanup',
      client: 'Mike Chen',
      amount: '$35,000',
      status: 'paid',
      method: 'Bank Transfer'
    },
    {
      id: 'PAY-2024-003',
      date: '2024-03-12',
      job: 'JOB-2024-091 - Mould Remediation',
      client: 'ABC Corporation',
      amount: '$8,500',
      status: 'pending',
      method: 'Pending'
    },
    {
      id: 'PAY-2024-004',
      date: '2024-03-10',
      job: 'JOB-2024-089 - Storm Damage Repair',
      client: 'Williams Family',
      amount: '$22,000',
      status: 'paid',
      method: 'Bank Transfer'
    },
    {
      id: 'PAY-2024-005',
      date: '2024-03-08',
      job: 'JOB-2024-087 - Emergency Water Extraction',
      client: 'Green Tech Ltd',
      amount: '$4,000',
      status: 'pending',
      method: 'Pending'
    }
  ];

  const monthlyBreakdown = [
    { month: 'January', earnings: '$42,500', jobs: 15 },
    { month: 'February', earnings: '$44,700', jobs: 18 },
    { month: 'March', earnings: '$38,250', jobs: 12 }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filterStatus === 'all') return true;
    return transaction.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Earnings</h1>
          <p className="text-gray-300">Track your income and payment history</p>
        </div>

        {/* Earnings Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />
              <ArrowUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{earningsSummary.totalEarnings}</p>
            <p className="text-gray-300">Total Earnings</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-400" />
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{earningsSummary.thisMonth}</p>
            <p className="text-gray-300">This Month</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-8 h-8 text-yellow-400" />
              <span className="text-xs px-2 py-1 bg-yellow-600 text-white rounded-full">Pending</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{earningsSummary.pending}</p>
            <p className="text-gray-300">Pending Payment</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-purple-400" />
              <button className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700">
                Withdraw
              </button>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{earningsSummary.available}</p>
            <p className="text-gray-300">Available to Withdraw</p>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Monthly Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monthlyBreakdown.map((month, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-white font-semibold mb-2">{month.month}</h3>
                <p className="text-2xl font-bold text-green-400 mb-1">{month.earnings}</p>
                <p className="text-gray-300 text-sm">{month.jobs} jobs completed</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(month.jobs / 20) * 100}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-300">{month.jobs}/20</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Transaction History</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-transparent border-0 outline-none"
                >
                  <option value="all" className="text-gray-900">All Status</option>
                  <option value="paid" className="text-gray-900">Paid</option>
                  <option value="pending" className="text-gray-900">Pending</option>
                </select>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-gray-300">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-gray-300">Date</th>
                  <th className="text-left py-3 px-4 text-gray-300">Job Details</th>
                  <th className="text-left py-3 px-4 text-gray-300">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 text-gray-300">Method</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{transaction.id}</td>
                    <td className="py-3 px-4 text-gray-300">{transaction.date}</td>
                    <td className="py-3 px-4">
                      <p className="text-white">{transaction.job}</p>
                      <p className="text-gray-300 text-sm">{transaction.client}</p>
                    </td>
                    <td className="py-3 px-4 text-green-400 font-semibold">{transaction.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{transaction.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function ContractorPortalEarningsPage() {
  return (
    <>
      <AntigravityNavbar />
      <ContractorPortalEarningsPageOriginal />
      <AntigravityFooter />
    </>
  );
}
