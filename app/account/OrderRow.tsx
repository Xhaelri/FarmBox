function OrderRow({ id, date, total, status }) {
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{date}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{total}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
            status === 'on the way' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            {status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button className="text-green-500 hover:text-green-700">View Details</button>
        </td>
      </tr>
    );
  }
  
  export default OrderRow;