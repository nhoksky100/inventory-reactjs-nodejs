import React, { Component, Fragment } from 'react';
import Sidebar from '../SideBar/SidebarLeft';
// import SidebarRight from '../SideBar/SidebarRight';
// import ContentOverView from '../Content/OverView/ContentOverView';
import HeaderTopProfile from '../Header/HeaderTopProfile';
import UploadFile from '../SideBar/UploadFile';
import HeaderMidProfile from '../Header/HeaderMidProfile';
// import Withdraw from './Withdraw';
// import ListFindFriend from '../Content/ListFindFriend';
import Setting from '../SideBar/Setting';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import Cookies from 'universal-cookie';
import { checkExistLoginApi } from '../LoginSignUp/checkExistLoginApi';
import axios from 'axios';
import { connect } from 'react-redux';


// import Partner from '../Content/Partner'
import Warehouse from '../Content/Warehouse/Warehouse';
// import InventoryCheck from '../Content/InventoryCheck';
import Member from '../Content/Member/Member';
import RequestListReturn from '../Content/RequestInto/RequestListReturn';
import AddMember from '../Content/Member/AddMember';
import ItemList from '../Content/ItemList/ItemList';
import AddItemList from '../Content/ItemList/AddItemList';
import AddRequest from '../Content/RequestInto/AddRequest';
import AddAccount from '../Content/Member/AddAccount';
import ListAccount from '../Content/Member/ListAccount';
import RequestListApproved from '../Content/RequestInto/RequestListApproved';
import RequestListNotApprove from '../Content/RequestInto/RequestListNotApprove';
import RequestListAll from '../Content/RequestInto/RequestListAll';
import PurchaseRequestNotApprove from '../Content/Purchase/PurchaseRequestNotApprove';
import PurchaseRequestListAll from '../Content/Purchase/PurchaseRequestListAll';
import PurchaseRequestListApproved from '../Content/Purchase/PurchaseRequestListApproved';
import Supplier from '../Content/Supplier/Supplier';
import AddSupplier from '../Content/Supplier/AddSupplier';
import PurchaseIntoWarehouse from '../Content/Purchase/PurchaseIntoWarehouse';
import AddDocument from '../Content/Purchase/AddDocument';
import Document from '../Content/Purchase/Document';
import AddCreateWarehouse from '../Content/ItemList/AddCreateWarehouse';
import CreateWarehouseAreaList from '../Content/ItemList/CreateWarehouseAreaList';
// import HeaderTopProfile from './HeaderTopProfile';
import bcrypt from 'bcryptjs';
import IntoWarehouseList from '../Content/Warehouse/IntoWarehouseList';
import ContentOverView from '../Content/OverView/ContentOverView';
import Request from '../Content/Request/Request';
import TransferExport from '../Content/Warehouse/TransferExport';
import TransferExportForm from '../Content/Warehouse/TransferExportForm';
// import ProfileCustomer from '../Header/ProfileCustomer';
import ProfileForm from '../Header/ProfileForm';

const getDataImageProfile = () => axios.get('/imageFile').then((res) => res.data)
const getdataListAccount = () => axios.get('/getAccount').then((res) => res.data)
const getdataMember = () => axios.get('/getMember').then((res) => res.data)

class FormAccountCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 'auto',
            isLogin: null,
            imageProfile: '',
            tokenObj: {},
            username: '',
            permission: '',
            dataAccount: [],
            dataMember: [],
            department: '',
            id: '',
            dataLoaded: false,

        };
        this._isMounted = false
    }
    componentDidMount() {
        this._isMounted = true
        // this.checkExistAccount();
        this.updateHeight();
        this.dataImageProfile()
        this.getData()

        // Thêm sự kiện resize để theo dõi thay đổi kích thước màn hình
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        this._isMounted = false

        // Loại bỏ sự kiện resize khi component bị unmount
        window.removeEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps, prevState) {
        const { isUpdateSetting } = this.props;
        if (isUpdateSetting && isUpdateSetting !== prevProps.isUpdateSetting) {

            this.dataImageProfile();
            this.props.IS_UPDATE_SETTING(false);
        }
    }


    handleResize = () => {
        // Xử lý sự kiện resize và cập nhật chiều cao
        this.updateHeight();
    };

    updateHeight() {

        // Kiểm tra và cập nhật chiều cao nếu nó vượt quá 600px
        if (window.innerHeight > 690) {
            if (this._isMounted) {

                this.setState({
                    height: 'auto',
                });
            }
        } else {
            if (this._isMounted) {

                this.setState({
                    height: '600px',
                });
            }
        }
    }
    getData = () => {
        this._isMounted = true
        getdataListAccount().then((res) => {
            if (res) {
                if (this._isMounted) {

                    this.setState({ dataAccount: res, dataLoaded: true })
                    this.isBcrypt(res)
                }
            }
        })
        getdataMember().then((res) => {
            const tokenObj = this.getCookie('loginObject') || ''
            if (res && tokenObj) {
                res.map((value) => {
                    if (value.memberCode === tokenObj.codeToken.accountCode) {
                        // const isPermission = bcrypt.compareSync(value.memberPermission, tokenObj.codeToken.accountPermission)
                        // const memberName = value.memberName
                        const department = value.memberDepartment
                        const memberName = value.memberName
                        if (this._isMounted) {

                            this.setState({ department, dataLoaded: true })
                            this.props.getDepartment(department);
                            this.props.getMemberName(memberName);
                        }
                        // if (isPermission) {

                        // }
                    }
                })
                // this.setState({ departmentApproveDate: departmentApproveDate})
            }
        })
    }
    async isBcrypt(dataAccount) {
        const tokenObj = this.getCookie('loginObject') || ''

        let permission = '';

        if (dataAccount && tokenObj) {
            for (let value of dataAccount) {
                if (tokenObj.codeToken.id === value.id) {
                    const isPermission = await bcrypt.compare(value.accountPermission, tokenObj.codeToken.accountPermission);
                    if (isPermission) {
                        permission = value.accountPermission;
                        this.props.getPermission(permission)
                        break; // Không cần duyệt các phần tử khác nữa nếu đã tìm thấy quyền
                    }
                }
            }

        }
        this.setState({ permission: permission, dataLoaded: true });
    }
    dataImageProfile = () => {
        const tokenObj = this.getCookie('loginObject') || ''
        if (tokenObj) {

            getDataImageProfile().then((res) => {

                res.map((value) => {
                    if (tokenObj.codeToken.id === value.id) {
                        if (this._isMounted) {
                            this.setState({ imageProfile: value.image })
                        }

                        return;
                    }
                })

            })
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        const { imageProfile } = this.props;
        const  imageProfileState  = this.state.imageProfile;

        if (imageProfile && imageProfile !== imageProfileState) {
            this.setState({ imageProfile: imageProfile })
        }
    }

    showFormProfile = (tokenObj) => {
        const pathUrl = this.props.match.path || '';
        const { imageProfile, dataLoaded } = this.state;
        if (!dataLoaded) {
            return <div className='loader'></div>
        } else {


            return (
                <Fragment>
                    <Sidebar tokenObj={tokenObj} />
                    <section id="content">


                        <HeaderTopProfile pathUrl={pathUrl} tokenObj={tokenObj} imageProfile={imageProfile} />
                        {/* <HeaderMidProfile pathUrl={pathUrl} /> */}
                        <main >
                            {

                                this.isShowForm(tokenObj)
                            }
                        </main>
                    </section>


                </Fragment>
            )
        }
    }

    isToast = () => {
        if (this.state.dataLoaded) {

            window.history.back()
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>Quền hạn không đúng!</i></div>);

        }
        return null
    }

    isShowForm = (tokenObj) => {

        const { imageProfile, permission, department, dataLoaded } = this.state;

        const pathUrl = this.props.match.path || '';
        // if(pathUrl)
        if (pathUrl && typeof pathUrl === 'string' && dataLoaded && permission) {

            switch (pathUrl) {
                case '/':
                    return < ContentOverView tokenObj={tokenObj} imageProfile={imageProfile} />

                case '/warehouse':
                    if (permission === 'Lãnh đạo' || permission === 'Thành viên kho' ||
                        (permission === 'Trưởng phòng' && department === 'Kế toán')) {
                        return <Warehouse tokenObj={tokenObj} />
                    } else {

                        this.isToast();

                    }
                    break;
                case '/into-warehouse-list':
                    if (permission === 'Lãnh đạo' || permission === 'Thành viên kho' ||
                        (permission === 'Trưởng phòng' && department === 'Kế toán')) {
                        return <IntoWarehouseList tokenObj={tokenObj} />
                    } else {
                        this.isToast()
                    }
                    break;
                case '/transfer-warehouse-export':
                    if (permission === 'Lãnh đạo' || permission === 'Thành viên kho' ||
                        (permission === 'Trưởng phòng' && department === 'Kế toán')) {
                        return <TransferExportForm tokenObj={tokenObj} />
                    } else {
                        this.isToast()
                    }
                    break;

                case '/create-warehouse':
                    if (permission === 'Lãnh đạo' || permission === 'Admin') {

                        return <AddCreateWarehouse tokenObj={tokenObj} />
                    } else {
                        this.isToast()
                    }
                    break;

                case '/warehouse-list':
                    if (permission === 'Lãnh đạo' || permission === 'Admin' ||
                        (permission === 'Trưởng phòng' && department === 'Kế toán') ||
                        permission === 'Thành viên kho'
                    ) {
                        return <CreateWarehouseAreaList tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                case '/purchase':
                    if (permission === 'Lãnh đạo' || permission === 'Thành viên thu mua' ||
                        (permission === 'Trưởng phòng' && department === 'Kế toán')
                    ) {

                        return <PurchaseRequestNotApprove tokenObj={tokenObj} />
                    } else {

                        this.isToast();

                    }
                    break;
                case '/purchase/document':
                    if (permission === 'Lãnh đạo' || permission === 'Thành viên thu mua' ||
                        (permission === 'Trưởng phòng' && department === 'Kế toán')
                    ) {

                        return <Document tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                case '/purchase/add-document':
                    if (permission === 'Thành viên thu mua') {
                        return <AddDocument tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                case '/supplier':
                    return <Supplier tokenObj={tokenObj} />
                case '/add-supplier':
                    if (permission === 'Admin') {
                        return <AddSupplier tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                case '/purchase/into-warehouse':
                    if (permission === 'Thành viên thu mua') {
                        return <PurchaseIntoWarehouse tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                case '/purchase/request-approved':
                    if (permission === 'Lãnh đạo' || permission === 'Thành viên thu mua' ||
                        (permission === 'Trưởng phòng' && department === 'Kế toán')
                    ) {
                        return <PurchaseRequestListApproved tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                case '/purchase/request-all':
                    if (permission === 'Lãnh đạo' || permission === 'Thành viên thu mua' ||
                        (permission === 'Trưởng phòng' && department === 'Kế toán')
                    ) {
                        return <PurchaseRequestListAll tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                case '/member':
                    if (permission === 'Lãnh đạo' || permission === 'Admin'
                    ) {
                        return <Member tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                case '/add-member':
                    if (permission === 'Admin'
                    ) {
                        return <AddMember tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                case '/list-account':
                    if (permission === 'Lãnh đạo' || permission === 'Admin'
                    ) {
                        return <ListAccount tokenObj={tokenObj} />

                    } else {
                        this.isToast()

                    }
                    break;
                case '/add-account':
                    if (permission === 'Admin'
                    ) {
                        return <AddAccount tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                case '/request':
                    return <Request pathUrl={pathUrl} tokenObj={tokenObj} />
                // case '/requestInto/request-return':
                //     return <RequestListReturn tokenObj={tokenObj} />
                // case '/requestInto/request-approved':
                //     return <RequestListApproved tokenObj={tokenObj} />
                // case '/requestInto/request-not':
                //     return <RequestListNotApprove tokenObj={tokenObj} />
                // case '/requestInto/request-all':
                //     return <RequestListAll tokenObj={tokenObj} />
                // case '/requestInto/add-request':
                //     return <AddRequest tokenObj={tokenObj} />
                case '/itemlist':

                    return <ItemList tokenObj={tokenObj} />
                case '/add-itemlist':
                    if (permission === 'Admin'
                    ) {
                        return <AddItemList tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                case '/profile-acctount':

                    return <ProfileForm tokenObj={tokenObj} />

                    break;
                case '/setting':
                    if (permission === 'Lãnh đạo' || permission === 'Admin') {

                        return <Setting tokenObj={tokenObj} />
                    } else {
                        this.isToast()

                    }
                    break;
                default:
                    return;
            }
        }


    }

    processTokenObj = async (tokenObj) => {
        try {
            // Thực hiện xử lý ở đây
            return tokenObj;
        } catch (error) {
            console.error('Error in processTokenObj:', error);
            throw error;
        }
    };
    getCookie = (username) => {
        const cookies = new Cookies();
        // Lấy giá trị từ cookie
        return cookies.get(username) || null;
    }
    checkExistAccount = async () => {
        try {

            // const tokenObj = this.getCookie('loginObject')
            // Xử lý tokenObj trước khi gọi checkExistLoginApi
            // const processedTokenObj = await this.processTokenObj(tokenObj);
            // console.log(processedTokenObj,'processedTokenObj');
            // Gọi checkExistLoginApi với tokenObj đã được xử lý
            // await checkExistLoginApi(processedTokenObj.codeToken);

            // Các bước khác sau khi xử lý checkExistLoginApi nếu cần
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi nếu cần
        }
    }

    render() {

        try {

            const tokenObj = this.getCookie('loginObject')
            // isExist-SignUp

            // <CheckExistLoginApi profileCustomer={profileCustomer} />
            if (!tokenObj) {
                // return this.showFormProfile()
                return <Redirect to='/login' />
            }
            return (
                this.showFormProfile(tokenObj.codeToken)
            );
        } catch (error) {
            return <div>
                <p>Đã xảy ra lỗi khi xử lý dữ liệu.</p>
            </div>

        }

    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        isUpdateSetting: state.allReducer.isUpdateSetting,
        imageProfile: state.allReducer.imageProfile

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        IS_UPDATE_SETTING: (action_isUpdateSetting) => {
            dispatch({ type: 'isUpdateSetting', action_isUpdateSetting })
        },
        getPermission: (action_permission) => {
            dispatch({ type: 'permission', action_permission })
        },
        getDepartment: (action_department) => {
            dispatch({ type: 'department', action_department })
        },
        getMemberName: (action_memberName) => {
            dispatch({ type: 'memberName', action_memberName })
        },


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormAccountCustomer)