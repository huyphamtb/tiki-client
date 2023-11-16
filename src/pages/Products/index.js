import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Pagination, Radio, Result, Row, Slider } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import BRAND_API from '../../api/brand';
import CATEGORY_API from '../../api/category';
import PRODUCT_API from '../../api/product';
import Product from '../../components/Product';
import { INLAND, OVERSEA, STATUS_FAIL } from '../../constants/api';
import { formatNumber } from '../../utils';
import CheckboxGroup from './components/CheckboxGroup';
import FilterWrapper from './components/FilterWrapper';
import RadioGroup from './components/RadioGroup';
import './style.scss';

const rateOptions = [
  {
    _id: 'ALL',
    label: 'Tất cả',
    value: 'null',
  },
  {
    _id: '3',
    label: '3 Sao trở lên',
    value: '3',
  },
  {
    _id: '4',
    label: '4 Sao trở lên',
    value: '4',
  },
  {
    _id: '5',
    label: '5 Sao trở lên',
    value: '5',
  },
];

const originOptions = [
  {
    _id: 'ALL',
    label: 'Tất cả',
    value: 'null',
  },
  {
    _id: OVERSEA,
    label: 'Nước ngoài',
    value: OVERSEA,
  },
  {
    _id: INLAND,
    label: 'Trong nước',
    value: INLAND,
  },
];

const sortOptions = [
  {
    _id: '1',
    lable: 'Giá tăng dần',
    value: '1',
    type: 'price',
  },
  {
    _id: '2',
    lable: 'Giá giảm dần',
    value: '-1',
    type: 'price',
  },
  {
    _id: '3',
    lable: 'Mới nhất',
    value: '-1',
    type: 'createdAt',
  },
  {
    _id: '4',
    lable: 'Cũ nhất',
    value: '1',
    type: 'createdAt',
  },
];

const priceRange = [0, 100000000];

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const ProductsPage = () => {
  const query = useQuery();
  const history = useHistory();
  const search = window.location.search;
  const { userInfo, addresses } = useSelector((state) => state.common);

  const [address, setAddress] = useState();

  const defaultMaxPrice = query.get('max_price');
  const defaultMinPrice = query.get('min_price');
  const defaultRate = query.get('rate');
  const defaultCategories = query.get('categories');
  const defaultOrigin = query.get('origin');
  const defaultBrand = query.get('brand');
  const defaultPage = query.get('page');
  const defaultSearch = query.get('search');
  const defaultSort = query.get('sort');
  const defaultSortValue = query.get('sort_value');

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [brandsOptions, setBrandsOptions] = useState([]);
  const [prices, setPrices] = useState([defaultMinPrice, defaultMaxPrice]);
  const [rate, setRate] = useState(defaultRate || 'null');
  const [origin, setOrigin] = useState(defaultOrigin || 'null');
  const [categories, setCategories] = useState(defaultCategories?.split(','));
  const [brand, setBrand] = useState(defaultBrand || 'null');
  const [sort, setSort] = useState(defaultSort);
  const [sortValue, setSortValue] = useState(defaultSortValue);

  const [page, setPage] = useState(defaultPage);

  const [minPrice, maxPrice] = prices;
  const sortId = useMemo(() => {
    let sortObj = sortOptions.find(
      (item) => item.type === sort && item.value === sortValue
    );

    return sortObj?._id;
  }, [sort, sortValue]);

  const handleCategoriesChange = (value) => {
    setCategories(value);
  };

  const handleBrandsChange = ({ target: { value } }) => {
    setBrand(value);
  };

  const handleOriginChange = ({ target: { value } }) => {
    setOrigin(value);

  };

  const handlePriceChange = (value) => {
    setPrices(value);
  };

  const handleRateChange = ({ target: { value } }) => {
    setRate(value);
  };

  const handleSortChange = ({ target: { value } }) => {
    const sortObj = sortOptions.find((item) => item._id === value);

    setSort(sortObj.type);
    setSortValue(sortObj.value);
    setPage(1);
  };

  const handlePageChange = (value) => {
    setPage(value);
  };

  const updateQuery = () => {
    let url = '/products?status=true&';
    if (minPrice) url += `min_price=${minPrice}&`;
    if (maxPrice) url += `max_price=${maxPrice}&`;
    if (rate && rate !== 'null') url += `rate=${rate}&`;
    if (origin && origin !== 'null') url += `origin=${origin}&`;
    if (categories?.length > 0) url += `categories=${categories.join(',')}&`;
    if (brand && brand !== 'null') url += `brand=${brand}&`;
    if (defaultSearch) url += `search=${defaultSearch}&`;
    if (sort && sortValue) url += `sort=${sort}&sort_value=${sortValue}&`;
    if (page) url += `page=${page}&`;

    history.push(url);
  };

  useEffect(async () => {
    try {
      const response = await PRODUCT_API.queryProducts(search || '');

      if (response.status === STATUS_FAIL) return console.log(response.message);

      setProducts(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.log(error);
    }
    //call api here
  }, [search]);

  useEffect(async () => {
    try {
      const categoriesResponse = await CATEGORY_API.queryCategories();

      if (categoriesResponse.status === STATUS_FAIL)
        return console.log(categoriesResponse.message);

      setCategoriesOptions(
        categoriesResponse.data.map((item) => ({
          _id: item._id,
          value: item._id,
          label: item.name,
        }))
      );

      const brandsResponse = await BRAND_API.queryBrands();

      if (brandsResponse.status === STATUS_FAIL)
        return console.log(brandsResponse.message);

      setBrandsOptions([
        {
          _id: 'ALL',
          value: 'null',
          label: 'Tất cả',
        },
        ...brandsResponse.data.map((item) => ({
          _id: item._id,
          value: item._id,
          label: item.name,
        })),
      ]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    updateQuery();
  }, [prices, rate, origin, categories, brand, sort, sortValue, page]);

  useEffect(() => {
    const defaultAddr = addresses?.length > 0 ? addresses[0] : null;
    setAddress(defaultAddr);
  }, [addresses]);

  return (
    <div id="products">
      <div className="container">
        <div className="products__page-container">
          <div className="bread__crumb-container">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">
                  <HomeOutlined />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>Products</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="products-content">
          <Row gutter={16}>
            <Col xxl={4} xl={4} lg={4} md={0} sm={0} xs={0}>
              <div className="products-filters">
                <div className="address__section">
                  <span className="title">ĐỊA CHỈ NHẬN HÀNG</span>
                  <p className="address">
                    {address
                      ? `${address.street}, P.${address.ward.name}, Q.${address.district.name}, ${address.province.name}`
                      : 'Loading...'}
                  </p>
                  <Link to="/">Thay đổi</Link>
                </div>
                <div className="filters-wrapper">
                  <FilterWrapper title="THỂ LOẠI">
                    <CheckboxGroup
                      onChange={handleCategoriesChange}
                      data={categoriesOptions}
                      defaultValue={categories}
                    />
                  </FilterWrapper>
                  <FilterWrapper title="THƯƠNG HIỆU">
                    <RadioGroup
                      name="brand"
                      data={brandsOptions}
                      defaultValue={brand}
                      onChange={handleBrandsChange}
                    />
                  </FilterWrapper>
                  <FilterWrapper title="XUẤT XỨ">
                    <RadioGroup
                      name="origin"
                      defaultValue={origin}
                      data={originOptions}
                      onChange={handleOriginChange}
                    />
                  </FilterWrapper>
                  <FilterWrapper title="KHOẢNG GIÁ">
                    <div className="price__range-container">
                      <span className="price__range-number">
                        {formatNumber(minPrice || priceRange[0])}đ
                      </span>
                      <span className="price__range-number">
                        {formatNumber(maxPrice || priceRange[1])}đ
                      </span>
                    </div>
                    <Slider
                      onAfterChange={handlePriceChange}
                      range
                      min={priceRange[0]}
                      max={priceRange[1]}
                      defaultValue={[
                        minPrice || priceRange[0],
                        maxPrice || priceRange[1],
                      ]}
                      step={1000}
                    />
                  </FilterWrapper>
                  <FilterWrapper title="ĐÁNH GIÁ">
                    <RadioGroup
                      name="rate"
                      data={rateOptions}
                      onChange={handleRateChange}
                      defaultValue={rate}
                    />
                  </FilterWrapper>
                </div>
              </div>
            </Col>
            <Col xxl={20} xl={20} lg={20} md={24} sm={24} xs={24}>
              <div className="products-main__content">
                <div className="content-header">
                  <h1 className="title">
                    {defaultSearch
                      ? `Kết quả cho "${defaultSearch}"`
                      : 'Sản phẩm'}
                  </h1>
                  <div className="header-sorts">
                    <Radio.Group
                      onChange={handleSortChange}
                      defaultValue={sortId}
                      size="middle"
                      name="sort"
                    >
                      {sortOptions.map((item) => (
                        <Radio.Button key={item._id} value={item._id}>
                          {item.lable}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
                <div className="content-products__list">
                  {products.length > 0 ? (
                    <div className="products__list-container">
                      <Row gutter={[16, 16]}>
                        {products.map((item) => (
                          <Col xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Product data={item} />
                          </Col>
                        ))}
                      </Row>
                      {pagination.total > pagination.size && (
                        <div
                          className="pagination__container"
                          style={{ margin: '16px 0px' }}
                        >
                          <Pagination
                            defaultCurrent={pagination.current}
                            total={pagination.total}
                            current={page || 1}
                            pageSize={pagination.size}
                            onChange={handlePageChange}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <Result
                      status="warning"
                      title="Không tìm thấy sản phẩm phù hợp!."
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
