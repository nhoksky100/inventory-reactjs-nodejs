import { configureStore } from '@reduxjs/toolkit';

const noteInitialState = {
  moreSiderbar: '',
  isDisableInput: false,
  codeConfirmInput: [],

  isClearFormInput: false,
  isChangePassword: false,
  // gửi lại email
  reSendEmail: false,
  // update setting
  isUpdateSetting: false,
  permission: '',
  department: '',
  memberName: '',
  dataSearch: [],
  dataSearchValue: [],
  isDataSearch: false,
  isSearchFormExport: false,
  isSearchFormInto: false,
  isSearchFormTransferExport: false,
  indexRow: 0,
  imageProfile: '',
  // sear datetime
  dateTimeStart: '',
  dateTimeEnd: new Date().toISOString(),

  // Initial state properties go here
};

const AllReducer = (state = noteInitialState, action) => {
  switch (action.type) {
    // Your reducer logic goes here
  
    // search datetime
    case 'imageProfile':
      return { ...state, imageProfile: action.action_imageProfile }
    // search datetime
    case 'searchDatetimeStart':
      return { ...state, dateTimeStart: action.act_search_datetime }
    case 'searchDatetimeEnd':
      return { ...state, dateTimeEnd: action.act_search_datetime }
    case 'valueIndex':
      return { ...state, rowIndex: action.acttion_indexRow };
    case 'isSearchFormTransferExport':
      return { ...state, isSearchFormTransferExport: action.acttion_isSearchForm };
    case 'isSearchFormInto':
      return { ...state, isSearchFormInto: action.acttion_isSearchForm };
    case 'isSearchFormExport':
      return { ...state, isSearchFormExport: action.acttion_isSearchForm };
    case 'dataSearchValue':
      return { ...state, dataSearchValue: [...action.action_dataSearchValue] };

    case 'isDataSearch':
      return { ...state, isDataSearch: action.action_isDataSearch };

    case 'dataSearch':
      return { ...state, dataSearch: [...action.action_dataSearch] };

    case 'department':
      return { ...state, department: action.action_department };
    case 'memberName':
      return { ...state, memberName: action.action_memberName };

    case 'permission':
      return { ...state, permission: action.action_permission };

    case 'StatusSiderBar':
      return { ...state, moreSiderbar: action.action_moreSiderbar };

    case 'isDisableInput':
      return { ...state, isDisableInput: action.action_isDisableInput };

    case 'codeConfirmInput':
      return { ...state, codeConfirmInput: action.action_codeConfirmInput };

    case 'isClearFormInput':
      return { ...state, isClearFormInput: action.action_isClearFormInput };

    case 'isChangePassword':
      return { ...state, isChangePassword: action.action_isChangePassword };

    case 'reSendEmail':
      return { ...state, reSendEmail: action.action_reSendEmail };

    case 'isUpdateSetting':
      return { ...state, isUpdateSetting: action.action_isUpdateSetting };

    // More cases if needed
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    allReducer: AllReducer, // You can add more reducers here if needed
  },
});

export default store;
