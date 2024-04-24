import React from 'react'
import GoodBag from './components/good-bag'
import './index.less'

const personList = {
  0: '收藏',
  1: '点赞'
}

// const PersonalCenter = props => {
//   const [currentKeyMap, setCurrentKeyMap] = useState(0)
//   const { userInfo } = useSelector(store => store.userInfo)
//   const [selectedKeys, setSelectedKeys] = useState('0')

//   const { tab } = useParams()

//   useEffect(() => {
//     setCurrentKeyMap(+tab)
//     setSelectedKeys(tab)
//   }, [tab])

//   const handleClick = ({ key }) => {
//     setCurrentKeyMap(Number(key))
//     setSelectedKeys(key)
//   }

//   return (
//     <div className='personal-center-box'>
//       <div className='personal-center-introduction'>
//         <div className='personal-center-introduction-detail'>
//           <div className='personal-center-introduction-detail-headImg'>
//             <img src={userInfo.avatar} style={{ width: 60, height: 60, borderRadius: '50%' }} />
//           </div>
//           <div className='personal-center-introduction-detail-text'>
//             <div className='personal-center-introduction-detail-name'>{userInfo.nickName}</div>
//             {/* <div className='personal-center-introduction-detail-information'>
//               <span className='personal-center-introduction-detail-information-content'>
//                 <IdcardOutlined style={{ color: 'blue', marginRight: '3px' }} />
//               </span>
//               <span className='personal-center-introduction-detail-information-content'>
//                 <MailOutlined style={{ color: 'blue', marginRight: '3px' }} />
//               </span>
//             </div> */}
//           </div>
//         </div>
//         <div className='personal-center-introduction-result'>
//           {/* <div className='personal-center-introduction-result-item'>
//             <div className='personal-center-introduction-result-item-number'>{10}</div>
//             <div>练题</div>
//           </div> */}
//           {/* <div className='personal-center-introduction-result-item'>
//             <div className='personal-center-introduction-result-item-number'>{inputAmount}</div>
//             <div>录题</div>
//           </div> */}
//           <div className='personal-center-introduction-result-item'>
//             <div className='personal-center-introduction-result-item-number'>{20}</div>
//             <div>点赞</div>
//           </div>
//           <div className='personal-center-introduction-result-item'>
//             <div className='personal-center-introduction-result-item-number'>{30}</div>
//             <div>收藏</div>
//           </div>
//         </div>
//       </div>
//       <div className='personal-center-content'>
//         <div className='personal-center-content-left'>
//           <Menu
//             mode='inline'
//             onClick={handleClick}
//             style={{ width: 256 }}
//             selectedKeys={[selectedKeys]}
//           >
//             <Menu.Item key={0}>
//               <StarTwoTone twoToneColor='rgb(252,132,67)' />
//               <span>{personList[0]}</span>
//             </Menu.Item>
//             <Menu.Item key={1}>
//               <LikeTwoTone twoToneColor='#99bbff' />
//               <span>{personList[1]}</span>
//             </Menu.Item>
//           </Menu>
//         </div>
//         <div className='personal-center-content-right'>
//           {currentKeyMap === 0 && <CollectionBag />}
//           {currentKeyMap === 1 && <GoodBag />}
//         </div>
//       </div>
//     </div>
//   )
// }
const PersonalCenter = props => {
  return <GoodBag />
}

export default PersonalCenter
