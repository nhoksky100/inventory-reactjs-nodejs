import axios from 'axios';
import React, { Component } from 'react';
// import FormBankAccountInfo from './FormBankAccountInfo';
// import FormCardBank from './FormCardBank';
import validator from 'validator';
import Cookies from 'universal-cookie';
import imageDefault from './imageDefault';


import { connect } from 'react-redux';
import { toast } from 'react-toastify';


// const bcrypt = require('bcryptjs')
const getDataImageProfile = () => axios.get('/imageFile').then((res) => res.data)
const getdataMember = () => axios.get('/getMember').then((res) => res.data)

class ProfileAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: [],
            dataMember: [],
            imageProfile: '',
            errorMessageImage: '',
            id: '',
            email: '',
            image: '',
            dataLoaded:false,
        }
        // this.handleFileChange = this.handleFileChange.bind(this);
    }







    componentDidMount() {
        Promise.all([this.getData(),]).then(() => {


        });

        // this.setState({ email: email })

    }

    getData = async () => {
        this._isMounted = true
        try {
            const { tokenObj } = this.props || {}

            const [dataMember, dataProfile] = await Promise.all([
                getdataMember(),
                getDataImageProfile(),
                // getdataItemsList(),
                // getdataIntoWarehouse(),

            ]);


            if (dataMember) {

                if (this._isMounted) {
                    // let id = randomId();
                    // const isDuplicateitemsCode = (id) => {
                    //     return dataMember.some(item => item.id === id);
                    // };

                    // // Kiểm tra và tạo itemsCode mới nếu trùng lặp
                    // while (isDuplicateitemsCode(id)) {
                    //     id = randomId();
                    // }
                    const dataMemberFil = dataMember.filter(item => item.id === tokenObj.id) || []

                    this.setState({
                        dataMember: dataMemberFil,
                        id: dataMemberFil[0].id,
                        email: tokenObj.accountEmail,
                        dataLoaded:true

                    })

                }
            }
            if (dataProfile) {
                if (this._isMounted) {
                    const dataProfileFil = dataProfile.filter(item => item.id === tokenObj.id) || []
                    this.setState({
                        dataProfile: dataProfileFil,
                        image: dataProfileFil.length !== 0 ? dataProfileFil[0].image : imageDefault,
                        dataLoaded:true,
                    })
                }

            }


        } catch (error) {
            // Xử lý lỗi nếu có
            console.error("Error occurred while fetching data:", error);
        }


    }



    componentWillUnmount() {
        // Kiểm tra và thu hồi Object URL trước khi component bị hủy
        this.revokeObjectURL();

    }
    revokeObjectURL = () => {
        const { imageProfile } = this.state;
        if (imageProfile) {
            URL.revokeObjectURL(imageProfile[0]);
        }
    }


    getFile = (e) => {
        const filesImg = e.target.files[0]; // lay ten file


        if (filesImg !== undefined) {
            if (this.isImageFile(filesImg)) {

                let reader = new FileReader();
                reader.readAsDataURL(filesImg);
                reader.onloadend = function (e) {
                    // Thu hồi Object URL cũ trước khi cập nhật state
                    this.revokeObjectURL();
                    this.setState({
                        imageProfile: [reader.result],
                        errorMessageImage: '',
                    })

                }.bind(this);
            }
            else {

                this.setState({

                    imageProfile: '',
                    errorMessageImage: 'Chỉ chấp nhận file hình ảnh (jpg, png, etc.)',
                });
            }
        }

    }


    // save imageProfile
    handleSaveImageProfile = () => {
        const { id, email, imageProfile, } = this.state;
        axios.post('/imageFile', { id, email, image: imageProfile, })
            .then(() => {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Lưu hình ảnh thành công!</i></div>);
                this.getData();
                this.props.isImageProfile(imageProfile)
                this.setState({imageProfile:''})
            })
            .catch(error => {
                console.error('An error occurred during updates', error);
                // Xử lý lỗi tại đây, ví dụ:
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Đã xảy ra lỗi khi cập nhật dữ liệu!</i></div>);
            });

    }

    isShowForm = () => {

        // const { imageProfile,  } = this.props || './images/profile.jpg';
        // const { tokenObj } = this.props || [];
        const { dataMember,dataLoaded } = this.state;
        const { image } = this.state;
        if(!dataLoaded) return <div className='loader'></div>
        if (dataMember.length > 0) {
            return (

                <div className='table-data'>
                    <div className='order'>
                        <div className=''>

                            <table style={{ border: '1px solid #cdcdcd', width: '60%' }} border={1}>
                                <thead style={{ backgroundColor: '#289f26' }}>
                                    <tr>
                                        <th >Mục</th>
                                        <th >Thông tin</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    <tr>
                                        <td>
                                            <img style={{ width: '75px', height: '50px', objectFit: 'unset', padding: '0' }} className="" src={image} alt='' />
                                        </td>
                                        <td style={{ display: 'flex', border: 'none' }}>
                                            <div style={{ display: 'inline-block', margin: '0 auto', position: 'relative', cursor: 'pointer' }}>


                                                <input
                                                    type="file"
                                                    accept=".png, .jpeg, .jpg" // Chỉ chấp nhận các file có định dạng .png và .jpeg
                                                    onChange={(event) => this.getFile(event)} // Gọi hàm handleFileChange khi có sự thay đổi

                                                    name='imageProfile'
                                                    // style={{ marginLeft: '10px', border: '1px solid #cdcdcd' }}
                                                    style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: 0,
                                                        opacity: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        cursor: 'pointer'
                                                    }}
                                                    ref={'imageProfile'}
                                                />
                                                {this.state.imageProfile === '' && <label htmlFor={'imageProfile'} style={{ cursor: 'pointer' }}>
                                                    <i className='bx bxs-file-image' style={{ cursor: 'pointer', fontSize: '14px', color: '#007bff' }}>Tải lên hình ảnh mới</i>
                                                </label>
                                                }
                                                {this.state.errorMessageImage && (
                                                    <div style={{ color: 'red' }}>{this.state.errorMessageImage}</div>
                                                )}
                                                {this.state.imageProfile !== '' &&
                                                    <div>

                                                        <img style={{ width: '75px', height: '50px', objectFit: 'unset', padding: '0' }} className="" src={this.state.imageProfile[0]} alt='' />

                                                    </div>
                                                }
                                            </div>
                                            {this.state.imageProfile !== '' &&
                                                <div >


                                                    <button onClick={() => this.handleSaveImageProfile()} className='activeSaveImage'>Lưu</button>
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Họ tên</td>
                                        <td>{dataMember[0].memberName}</td>
                                    </tr>
                                    <tr>
                                        <td>Chức danh</td>
                                        <td>{dataMember[0].memberPermission}</td>
                                    </tr>
                                    <tr>
                                        <td>Bộ phận</td>
                                        <td>{dataMember[0].memberDepartment}</td>
                                    </tr>
                                    <tr>
                                        <td>Số điện thoại</td>
                                        <td>{dataMember[0].memberNumberPhone || ''}</td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>



                    </div>
                </div>



            );
        }
    };


    isImageFile = (file) => {
        // Kiểm tra nếu định dạng file là hình ảnh
        return file.type.startsWith('image/');
        // return /\.(jpe?g|png|gif|bmp)$/i.test(file.name);
    };



    handleKeyDown = (event) => {
        // // Lấy mã Unicode của ký tự được nhấn
        // const keyCode = event.keyCode || event.which;

        // // Kiểm tra xem ký tự là số không (mã Unicode từ 48 đến 57 là các ký tự số)
        // if (keyCode < 48 || keyCode > 57) {
        //     // Nếu không phải là số, ngăn chặn sự kiện mặc định của bàn phím
        //     event.preventDefault();
        // }
    }



    render() {


        return (
            <div>

                {this.isShowForm()}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
      
      
        // reSendEmail: state.allReducer.reSendEmail,

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
       
        isImageProfile: (action_imageProfile) => {
            dispatch({ type: 'imageProfile', action_imageProfile })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileAccount)