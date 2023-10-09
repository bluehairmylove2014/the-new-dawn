"use client";
import Breadcrumb from "@/components/molecules/Breadcrumb/Breadcrumb";
import Link from "next/link";
import "./styles.scss";
import { IProduct } from "@/modules/services/entities";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import { FILTER_OPTIONS, SORT_OPTIONS } from "@/constants/options";
import Checkbox from "@/components/atoms/Checkbox/Checkbox";
import { useEffect, useState } from "react";
import { useConvertCurrency } from "@/modules/business-logic/lib/currency/process/hooks/useConvertCurrency";
import Slider from "@/components/atoms/Slider/Slider";
import Pagination from "@/components/molecules/Pagination/Pagination";

const budgetFilterLimit = {
  min: 0,
  max: 100000000,
};

const Shop = () => {
  const [paginationState, setPaginationState] = useState<{
    currentPage: number;
    maxPage: number;
  }>({
    currentPage: 1,
    maxPage: 1,
  });
  const products: IProduct[] = [
    {
      id: "19057grtbeukfa198",
      image:
        "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/image-removebg-preview_(2)-gUcXQLCDx-transformsad%C3%A1%C4%91aed.png",
      name: "Đồng hồ thông minh HELIOS thường",
      features: [
        "Thoải mái thay đổi hình nền",
        "Có dự báo thời tiết",
        "Màn hình FHD sắc nét",
        "Tích hợp loa cao cấp (nghe nhạc, xem phim)",
      ],
      price: 350000,
      discount: 0.125,
      outOfStock: false,
    },
    {
      id: "1923eukfa198",
      image:
        "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/product%202.png",
      name: "Đồng hồ thông minh HELIOS PRO",
      features: [
        "Có tất cả tính năng của bản thường",
        "Màn hình được nâng cấp rõ rệt",
        "Khung kim loại chắc chắn",
        "Tích hợp AI phản hồi và điều khuyển",
      ],
      price: 650000,
      discount: 0.235,
      outOfStock: false,
    },
    {
      id: "19015beukfa198",
      image:
        "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/product-1.png",
      name: "Robo EMO thông minh",
      features: [
        "Tự động khám phá thế giới",
        "Giải trí cùng bạn mỗi ngày",
        "Tự nhận biết, nghe, nhìn và học hỏi",
        "Hỗ trợ bạn các công việc hằng ngày",
      ],
      price: 12000000,
      discount: 0,
      outOfStock: false,
    },
    {
      id: "19057grtbeukfa198",
      image:
        "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/image-removebg-preview_(2)-gUcXQLCDx-transformsad%C3%A1%C4%91aed.png",
      name: "Đồng hồ thông minh HELIOS thường",
      features: [
        "Thoải mái thay đổi hình nền",
        "Có dự báo thời tiết",
        "Màn hình FHD sắc nét",
        "Tích hợp loa cao cấp (nghe nhạc, xem phim)",
      ],
      price: 350000,
      discount: 0.125,
      outOfStock: false,
    },
    {
      id: "1923eukfa198",
      image:
        "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/product%202.png",
      name: "Đồng hồ thông minh HELIOS PRO",
      features: [
        "Có tất cả tính năng của bản thường",
        "Màn hình được nâng cấp rõ rệt",
        "Khung kim loại chắc chắn",
        "Tích hợp AI phản hồi và điều khuyển",
      ],
      price: 650000,
      discount: 0.235,
      outOfStock: false,
    },
    {
      id: "19015beukfa198",
      image:
        "https://rialloer.sirv.com/the_new_dawn/graphics/Helios/product-1.png",
      name: "Robo EMO thông minh",
      features: [
        "Tự động khám phá thế giới",
        "Giải trí cùng bạn mỗi ngày",
        "Tự nhận biết, nghe, nhìn và học hỏi",
        "Hỗ trợ bạn các công việc hằng ngày",
      ],
      price: 12000000,
      discount: 0,
      outOfStock: false,
    },
  ];
  const [budget, setBudget] = useState({
    min: budgetFilterLimit.min,
    max: budgetFilterLimit.max,
  });
  const [searchKeys, setSearchKeys] = useState<string[]>([]);
  const [filterSelected, setFilterSelected] = useState<string[]>([]);
  const [sortSelected, setSortSelected] = useState<null | string>(null);
  const { onConvertNumberToCurrency } = useConvertCurrency();

  const handleFilter = (name: string, value: boolean) => {
    if (value) {
      setFilterSelected([...filterSelected, name]);
    } else {
      setFilterSelected(filterSelected.filter((fs) => fs !== name));
    }
    refetch();
  };
  const handleSort = (name: string) => {
    setSortSelected(name);
    refetch();
  };
  const handleSearch = () => {
    //
  };
  const refetch = () => {
    //
    handleSearch();
  };

  const handleBudgetChange = (range: { min: number; max: number }) => {
    setBudget(range);
  };

  useEffect(() => {
    console.log(filterSelected);
  }, [filterSelected]);
  useEffect(() => {
    console.log(sortSelected);
  }, [sortSelected]);

  return (
    <div className="shop container">
      <Link href={""} className="shop__banner">
        SALE 5% cho người Việt!
      </Link>
      <div className="shop__interact">
        <div className="row">
          <Breadcrumb />
          <p className="search-result">Hiển thị 6 trong 23 kết quả</p>
        </div>
        <div className="row">
          <form className="search-box">
            <label htmlFor="shop-search">Tìm kiếm sản phẩm...</label>
            <input type="text" name="search" id="shop-search" />
          </form>
        </div>
      </div>
      <aside className="shop__sort-and-filter">
        <h5>
          <i className="fi fi-sr-filter"></i>Bộ lọc & Sắp xếp
        </h5>

        <div className="options-group">
          <h6>Mức giá</h6>
          <div className="budget__slider">
            <Slider
              minVal={budgetFilterLimit.min}
              maxVal={budgetFilterLimit.max}
              onChange={handleBudgetChange}
            />
          </div>
          <div className="budget__preview">
            <p>{onConvertNumberToCurrency(budget.min)}</p>
            <p>{onConvertNumberToCurrency(budget.max)}</p>
          </div>
          <h6>Loại</h6>
          {FILTER_OPTIONS.category.map((cate) => (
            <Checkbox
              key={cate.value}
              label={cate.name}
              name={cate.value}
              onCheck={handleFilter}
            />
          ))}
          <h6>Sắp xếp theo</h6>
          {SORT_OPTIONS.map((s) => (
            <Checkbox
              key={s.value}
              label={s.name}
              name={s.value}
              radio={true}
              radioName={s.radioName}
              onCheck={handleSort}
            />
          ))}
        </div>
      </aside>
      <main className="shop__product-list">
        {Array.isArray(products) ? (
          products.length > 0 ? (
            <>
              {products.map((p) => (
                <ProductCard
                  productData={p}
                  key={p.id}
                  size={"small"}
                  autoFill={true}
                ></ProductCard>
              ))}
              <Pagination
                state={{ paginationState, setPaginationState }}
                callback={() => {}}
              />
            </>
          ) : (
            <></>
          )
        ) : typeof products === "undefined" ? (
          <></>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
};

export default Shop;
