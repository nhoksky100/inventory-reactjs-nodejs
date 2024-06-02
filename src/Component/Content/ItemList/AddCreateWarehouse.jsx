import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom/cjs/react-router-dom';
import { UpdateDateTime } from '../../UpdateDateTime';
import axios from 'axios';
import { toast } from 'react-toastify';
import { randomId } from '../../RandomId/randomId'

const getdataCreateWarehouse = () => axios.get('/getCreateWarehouse').then((res) => res.data)

class AddCreateWarehouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTeamp: null,
            dataCreateWarehouse: [],
            isPrev: false,
            flagPosition: false,

            columnValues: ['warehouseCode', 'warehouseName','warehouseDateCreated',
            ],
            warehouseStatus:'Đang sử dụng',
            // input select
            isItemExist: false,
            id: ''
        };
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true
        this.getData()
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    getData = () => {
        getdataCreateWarehouse().then((res) => {

            if (res) {


                let warehouseCode = 'MK-' + randomId()
                let id = randomId();
                const isDuplicatewarehouseCode = (id) => {
                    return res.some(item => item.id === id);
                };

                // Kiểm tra và tạo warehouseCode mới nếu trùng lặp
                while (isDuplicatewarehouseCode(id)) {
                    id = randomId();
                }
                if (this._isMounted) {

                    this.setState({
                        dataCreateWarehouse: res.reverse(),

                        warehouseCode: warehouseCode,
                        id: id
                    })
                }
                // this.setState({ warehouseCode: warehouseCode })
            }
        })
    }
    undoClearAddRow = () => {
        this.setState({ isPrev: true })
    }
    isChange = (e) => {
        const { value, name } = e.target;
        const { dataCreateWarehouse } = this.state;
        // Kiểm tra xem giá trị nhập vào có tồn tại trong danh sách không
        if (name === 'warehouseName') {
            const isItemExist = dataCreateWarehouse.some(item => item.warehouseName === value);
            if(this._isMounted){
               
                this.setState({
                    [name]: value,
                    isItemExist: isItemExist
                })
            }
        } else {
            if(this._isMounted){

                this.setState({
                    [name]: value,
                })
            }
        }

    }

    handleSave = () => {
        const { id, warehouseCode, warehouseName, warehouseStatus, dataCreateWarehouse, flagPosition, isItemExist } = this.state;




        if (!isItemExist) {


            axios.post('/addCreateWarehouse', {
                id,
                warehouseCode,
                warehouseName,
                warehouseStatus,
                warehouseDateCreated: UpdateDateTime(),
                // warehouseDateUpdate: UpdateDateTime(),

            }).then(response => {
                // Xử lý sau khi yêu cầu được thêm thành công
                // console.log("Yêu cầu đã được thêm thành công:", response.data);

                // Cập nhật lại state hoặc thực hiện các hành động khác tại đây nếu cần
                // if (flagPosition) {
               
                if (this._isMounted) {

                    this.setState({
                        id: id,
                        warehouseCode: flagPosition ? randomId() : '',
                        warehouseName,
                        warehouseStatus,

                        warehouseDateCreated: UpdateDateTime(),
                        // warehouseDateUpdate: UpdateDateTime(),
                        isPrev: !flagPosition ? true : false,
                      
                        dataCreateWarehouse: [...dataCreateWarehouse, response.data] // Thêm dữ liệu mới vào state
                    })
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Tạo mới thành công!</i></div>)
            
                }
                this.getData();



                // Gọi lại hàm để lấy dữ liệu mới từ máy chủ và cập nhật state dataCreateWarehouse

            }).catch(error => {
                // Xử lý khi có lỗi xảy ra
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Đã xảy ra lỗi</i></div>)
                console.error("Đã xảy ra lỗi:", error);
            });
        } else {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>tạo mới thất bại!</i></div>)
        }
    }

    handleOptionClick = (option) => {
        this.setState({
            inputValue: option,
            showOptions: false // Ẩn danh sách tùy chọn sau khi người dùng chọn một tùy chọn
        });
    }
    arrayInputAddRow = () => {
        const { id, warehouseCode, columnValues, dataCreateWarehouse, isItemExist } = this.state;
        let pusInput = [];
        for (let i = 0; i < columnValues.length; i++) {
            if (columnValues[i] === 'warehouseName') {
                // Thêm một thẻ select và input/textarea vào mảng pusInput
                if (dataCreateWarehouse.length !== 0) {
                    // Nếu dataList không rỗng
                    // let foundItem = dataCreateWarehouse.find(item => item.tenhang === this.state[columnValues[i]]);
                    // console.log(foundItem, 'foundItem');
                    pusInput.push(
                        <td key={i} style={{ position: 'relative' }}>
                            <textarea
                                readOnly={false}
                                onChange={(event) => this.isChange(event)}
                                name={columnValues[i]}
                                value={this.state[columnValues[i]]}
                                autoFocus={i === 1 ? true : false}
                                style={{ marginLeft: '10px', border: '1px solid #cdcdcd' }}
                            />
                            <span style={{ position: 'relative', color: 'red' }}>{isItemExist && 'Kho này đã có'}</span>
                        </td>


                    );
                } else {
                    // Nếu dataList rỗng
                    pusInput.push(
                        <td key={i}>
                            <textarea
                                readOnly={false}
                                onChange={(event) => this.isChange(event)}
                                name={columnValues[i]}
                                value={this.state[columnValues[i]]}
                                autoFocus={i === 1 ? true : false}
                                style={{ marginLeft: '10px', border: '1px solid #cdcdcd' }}
                            />
                        </td>
                    );
                }
          
              
            } else {
                // Thêm một textarea cho các trường khác
                pusInput.push(
                    <td key={i}>

                        <textarea
                            readOnly={
                                columnValues[i] === 'id' || columnValues[i] === 'warehouseCode' ||
                                columnValues[i] === 'warehouseDateCreated' 
                                && true}
                            onChange={(event) => this.isChange(event)}
                            name={columnValues[i]}
                            value={
                                // (columnValues[i] === 'id')
                                //     ? id
                                // :
                                (columnValues[i] === 'warehouseCode')
                                    ? warehouseCode
                                    
                                        : (columnValues[i] === 'warehouseDateCreated')
                                            ? UpdateDateTime()
                                        // : (columnValues[i] === 'warehouseDateUpdate')
                                        //     ? UpdateDateTime()
                                            : this.state[columnValues[i]]
                            }
                            autoFocus={i === 2 ? true : false}
                            style={{ marginLeft: '10px', border: '1px solid #cdcdcd' }}
                        />
                    </td>
                );
            }
        }
        return pusInput;
    };
    render() {
        if (this.state.isPrev) {
            return <Redirect to='/warehouse-list' />
        }
        return (
            <div className='table-data'>
                <div className="order">
                    <div className='head'>
                        <div className="head-content-menu">
                            <img  onClick={() => this.undoClearAddRow()} title='Quay lại' src='../icons/color/undo.png' />
                        </div>
                    </div>
                    <div className="head">
                        <h3>Danh mục</h3>
                        {/* <i className="bx bx-search" /> */}
                        <i className="bx bx-filter" />
                    </div>
                    <div className='table-add-row '>

                        <table>
                            <thead>
                                <tr>
                                    <th ><i className='bx bxs-flag-checkered'></i></th>
                                    {/* <th >STT</th> */}
                                    <th >Mã kho</th>
                                    <th >Tên kho</th>
                                    {/* <th >Trạng thái</th> */}
                                    <th >Ngày tạo</th>
                                    {/* <th >Ngày cập nhật</th> */}
                                    <th >Hành động</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td><input onClick={() => this.setState({ flagPosition: !this.state.flagPosition })}
                                        style={{ cursor: 'pointer' }} type="checkbox" name="" id="" title='Chọn để giữ lại form nếu tiếp tục thêm hàng tiếp theo' /></td>
                                    {this.arrayInputAddRow()}

                                    <td >

                                        <img onClick={() => this.undoClearAddRow()} title='Quay lại' src='../icons/color/undo.png' />
                                        <img onClick={() => this.handleSave()} title='Đồng ý lưu' src='../icons/color/check.png' />
                                    </td>

                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCreateWarehouse;