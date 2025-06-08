"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import createCustomer from "./createCustomer";

export default function CreatePage() {
  const formRef = useRef();
  const router = useRouter();

  // フォームデータの状態管理を追加
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_id: '',
    age: '',
    gender: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    await createCustomer(formData);
    router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
  };

  // 入力値の変更を監視
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 全項目が入力されているかチェック
  const isFormValid = Object.values(formData).every(value => 
    value.trim() !== ''
  );

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              <h2 className="card-title">
                <p>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name} // 追加
                    onChange={handleInputChange}   // 追加
                    placeholder="桃太郎"
                    className="input input-bordered"
                  />
                </p>
              </h2>
              <p>
                Customer ID:
                <input
                  type="text"
                  name="customer_id"
                  value={formData.customer_id}    // 追加
                  onChange={handleInputChange}    // 追加
                  placeholder="C030"
                  className="input input-bordered"
                />
              </p>
              <p>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}            // 追加
                  onChange={handleInputChange}    // 追加
                  placeholder="30"
                  className="input input-bordered"
                />
              </p>
              <p>
                Gender:
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}         // 追加
                  onChange={handleInputChange}    // 追加
                  placeholder="女"
                  className="input input-bordered"
                />
              </p>
            </div>
            {isFormValid ? (
              <div className="flex justify-center">
                <button type="submit" className="btn btn-primary m-4 text-2xl">
                  作成
                </button>
              </div>
            ) : (
              <div className="text-center p-4">
                <p>全項目を入力してください</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}