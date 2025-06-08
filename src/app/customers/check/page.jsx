import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

export default async function ReadPage({ searchParams }) {
  // searchParamsからcustomer_idを取得
  const id = searchParams?.customer_id;
  
  // idが存在しない場合のエラーハンドリング
  if (!id) {
    return (
      <div className="alert alert-error">
        Customer IDが指定されていません
      </div>
    );
  }

  const customerInfo = await fetchCustomer(id);

  // customerInfoが空の場合のエラーハンドリング
  if (!customerInfo || customerInfo.length === 0) {
    return (
      <div className="alert alert-error">
        顧客情報が見つかりません
      </div>
    );
  }

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customerInfo[0]} />
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}
