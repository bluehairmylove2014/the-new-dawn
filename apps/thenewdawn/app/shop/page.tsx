'use client';
import Breadcrumb from '@presentational/molecules/Breadcrumb/Breadcrumb';
import Link from 'next/link';
import './styles.scss';
import ProductCard from '@presentational/molecules/ProductCard/ProductCard';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@constants/options';
import Checkbox from '@presentational/atoms/Checkbox/Checkbox';
import { useEffect, useRef, useState } from 'react';
import { useConvertCurrency } from '@modules/business-logic/lib/currency/process/hooks/useConvertCurrency';
import Slider from '@presentational/atoms/Slider/Slider';
import Pagination from '@presentational/molecules/Pagination/Pagination';
import CommonLoader from '@presentational/atoms/CommonLoader/CommonLoader';
import { useSearchProduct } from '@modules/business-logic/lib/search';
import { searchProductParams } from '@modules/services';
import Empty from '@presentational/atoms/Empty/Empty';
import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';
import { calculateMaxPage } from '@utils/helpers';

const budgetFilterLimit = {
  min: 0,
  max: 100000000,
};
const maxElementPerPage = 6;
const Shop = () => {
  const [paginationState, setPaginationState] = useState<{
    currentPage: number;
    maxPage: number;
  }>({
    currentPage: 1,
    maxPage: 1,
  });
  const [budget, setBudget] = useState({
    min: budgetFilterLimit.min,
    max: budgetFilterLimit.max,
  });
  const searchKeys = useRef<string>('');
  const [filterSelected, setFilterSelected] = useState<string[]>([]);
  const [sortSelected, setSortSelected] = useState<null | string>(null);
  const { onConvertNumberToCurrency } = useConvertCurrency();
  const [searchCriteria, setSearchCriteria] = useState<searchProductParams>({});
  const products = useSearchProduct(searchCriteria);

  const handleFilter = (name: string, value: boolean) => {
    if (value) {
      setFilterSelected([...filterSelected, name]);
    } else {
      setFilterSelected(filterSelected.filter((fs) => fs !== name));
    }
  };
  const handleSort = (name: string) => {
    setSortSelected(name);
  };
  const handleSearch = () => {
    setSearchCriteria({
      name: searchKeys.current,
      minBudget: budget.min,
      maxBudget: budget.max,
      category:
        filterSelected.length > 0 ? filterSelected.join('@') : undefined,
      sortBy: sortSelected || undefined,
      page: 1,
    });
  };

  const handleBudgetChange = (range: { min: number; max: number }) => {
    setBudget(range);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelected, sortSelected]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setPaginationState({
        ...paginationState,
        maxPage: calculateMaxPage(products, maxElementPerPage),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <div className="shop container">
      <Link href={''} className="shop__banner">
        SALE 5% cho người Việt!
      </Link>
      <div className="shop__interact">
        <div className="row">
          <Breadcrumb />
          <p className="search-result">Hiển thị 6 trong 23 kết quả</p>
        </div>
        <div className="row">
          <form
            className="search-box"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <button type="submit">
              <i className="fi fi-rr-search"></i>
            </button>
            <label htmlFor="shop-search">Tìm kiếm sản phẩm...</label>
            <input
              type="text"
              name="search"
              id="shop-search"
              onChange={(e) => {
                const value = e.target.value.trim();
                searchKeys.current = value;
                const labelEle = e.target.parentNode?.querySelector('label');
                if (!labelEle) return;
                if (value.length > 0) {
                  labelEle.style.display = 'none';
                } else {
                  labelEle.style.display = 'block';
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
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
          <div className="budget__submit-btn">
            <CommonButton style="soft-peach" onClick={handleSearch}>
              Lọc theo giá
            </CommonButton>
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
        {typeof products === 'undefined' ? (
          <CommonLoader />
        ) : products === null ||
          (Array.isArray(products) && products.length === 0) ? (
          <>
            <Empty label="Không có sản phẩm phù hợp" customSize={100} />
          </>
        ) : (
          <>
            {products.map((p) => (
              <ProductCard
                productData={p}
                key={p.productId}
                size={'small'}
                autoFill={true}
              ></ProductCard>
            ))}
            <Pagination
              state={{ paginationState, setPaginationState }}
              callback={() => {}}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Shop;
