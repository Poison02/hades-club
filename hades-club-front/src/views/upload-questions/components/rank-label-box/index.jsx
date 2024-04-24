import React, {
    Component, Fragment, useState, useEffect, forwardRef,
    useImperativeHandle,
} from 'react';
import req from '@utils/request';
import TagsEditor from '@components/tags-editor';
import { apiName, ModuleType, starList } from '../../constant';
import './index.less';


const RankLabelBox = (props, ref) => {

    const [rankList, setRankList] = useState(starList)
    const [firstCategoryList, setFirstCategoryList] = useState([])
    const [firstSelected, setFirstSelected] = useState(null)
    const [secondCategoryList, setSecondCategoryList] = useState([])
    const [thirdCategoryList, setThirdCategoryList] = useState([])

    /**
     * 获得一级分类数据
     */
    const geFirstCategoryList = () => {
        const params = { categoryType: 1 };
        req({
            method: 'post',
            data: params,
            url: apiName.queryPrimaryCategory,
        })
            .then((res) => {
                const list = res.data.map((item, index) => {
                    return {
                        ...item,
                        active: index == 0,
                    };
                });
                setFirstCategoryList(list)
                setFirstSelected(list[0].id)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        geFirstCategoryList()
    }, [])

    /**
     * 初始化数据
     */
    const initRankLabel = () => {
        // const [rankList, setRankList] = useState(starList)
        // const [firstCategoryList, setFirstCategoryList] = useState([])
        // const [firstSelected, setFirstSelected] = useState(null)
        // const [secondCategoryList, setSecondCategoryList] = useState([])
        // const [thirdCategoryList, setThirdCategoryList] = useState([])
        setRankList(starList)
        setFirstCategoryList([])
        setFirstSelected(null)
        setSecondCategoryList([])
        setThirdCategoryList([])
        setTimeout(() => {
            geFirstCategoryList()
        })
    };

    useImperativeHandle(ref, () => ({
        // onCallback 就是暴露给父组件的方法
        initRankLabel
    }));

    /**
    * 选择职级-单选
    * @param {*} handleStatusList
    * @param {*} selectList
    */
    const onHandleChangeRank = (handleStatusList) => {
        // console.log(handleStatusList, selectList)
        setRankList(handleStatusList)
        props.handleChangeRank(handleStatusList.filter(t => t.active));
    };

    /**
     * 职级选择
     * @param {*} rankList
     * @returns
     */
    const rendeRrankModule = () => {
        return (
            <div className="upload-single-container">
                <div className="upload-single-title">职级选择：</div>
                <div className="upload-single-main">
                    <TagsEditor
                        categoryList={rankList}
                        isSingleChoice={true}
                        onChangeLabel={onHandleChangeRank}
                        isDisabledReverseSelection={true}
                    />
                    {/* <span style={{ marginLeft: '8px', color: 'red' }}>
                        注：所选职级应为熟练掌握该题的最低职级
                    </span> */}
                </div>
            </div>
        );
    };



    const listType = {
        1: setFirstCategoryList,
        2: setSecondCategoryList,
        3: setThirdCategoryList
    }

    /**
     * 选择一级分类-单选
     * @param {*} handleStatusList 带有是否选中状态的原数组
     * @param {*} selectList 选中id的数组
     */
    const onChangeTags = (handleStatusList, selectList, type) => {
        listType[type](handleStatusList)
        if (type == 1) {
            setFirstSelected(selectList[0])
        }
    }

    useEffect(() => {
        props.onChangeRankLabel(firstCategoryList, secondCategoryList, thirdCategoryList)
    }, [firstCategoryList, secondCategoryList, thirdCategoryList])

    /**
     * 获得二级分类数据
     * @param {*} id 一级分类id
     */
    const getSecondCategoryList = (id) => {
        const params = { categoryType: 2, parentId: id };
        req({
            method: 'post',
            data: params,
            url: apiName.queryCategoryByPrimary,
        }).then((res) => {
            setSecondCategoryList(res.data)
        }).catch((err) => console.log(err));
    }

    /**
    * 获得标签数据
    * @param {*} id 一级分类id
    */
    const getLabelList = (id) => {
        const params = { categoryId: id };
        req({
            method: 'post',
            data: params,
            url: apiName.queryLabelByCategoryId,
        }).then((res) => {
            setThirdCategoryList(res.data.map(item => {
                return {
                    ...item,
                    categoryName: item.labelName
                }
            }))
        }).catch((err) => console.log(err));
    }



    useEffect(() => {
        if (firstSelected) {
            getSecondCategoryList(firstSelected);
            getLabelList(firstSelected)
        }
    }, [firstSelected])

    /**
     * 一级分类选择
     * @param {*} firstCategoryList
     * @returns
     */
    const renderFirstModule = (firstCategoryList) => {
        return (
            <Fragment>
                {firstCategoryList?.length > 0 && (
                    <div className="upload-single-container">
                        <div className="upload-single-title">一级分类：</div>
                        <div className="upload-single-main">
                            <TagsEditor
                                categoryList={firstCategoryList}
                                isSingleChoice={true}
                                onChangeLabel={(list, id) => onChangeTags(list, id, 1)}
                                isDisabledReverseSelection={true}
                            />
                        </div>
                    </div>
                )}
            </Fragment>
        );
    };

    /**
     * 二级分类选择
     * @param {*} secondCategoryList
     * @returns
     */
    const renderSecondModule = () => {
        return (
            <div className="upload-single-container">
                <div className="upload-single-title">二级分类：</div>
                <div className="upload-single-main">
                    <TagsEditor
                        moduleType={ModuleType.second}
                        categoryList={secondCategoryList}
                        isSingleChoice={false}
                        onChangeLabel={(list, id) => onChangeTags(list, id, 2)}
                    />
                </div>
            </div>
        );
    };


    /**
    * 三级标签选择
    * @param {*} thirdCategoryList
    * @returns
    */
    const renderThirdModule = () => {
        return (
            <div className="upload-single-container">
                <div className="upload-single-title">三级标签：</div>
                <div className="upload-single-main">
                    <TagsEditor
                        moduleType={ModuleType.third}
                        categoryList={thirdCategoryList}
                        isSingleChoice={false}
                        onChangeLabel={(list, id) => onChangeTags(list, id, 3)}
                    />
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            {rendeRrankModule()}
            {renderFirstModule(firstCategoryList)}
            {secondCategoryList?.length > 0 ? (
                <Fragment>
                    {renderSecondModule()}
                    {thirdCategoryList?.length > 0 && renderThirdModule()}
                </Fragment>
            ) : null}
        </Fragment>
    )
}

export default forwardRef(RankLabelBox)


class RankLabelBox1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            secondCategoryList: [],
            thirdCategoryList: [],
            rankList: starList,
        };
    }

    componentDidMount() {
        this.geFirstCategoryList();
    }

    firstValue = ''; // 一级分类id

    firstCategoryValue = ''; // 一级分类的值
    secondCategoryValue = []; // 二级分类的值
    thirdCategoryValue = []; // 三级标签的值

    /**
     * 初始化数据
     */
    initRankLabel = () => {
        this.firstCategoryValue = ''; // 一级分类的值
        this.secondCategoryValue = []; // 二级分类的值
        this.thirdCategoryValue = []; // 三级标签的值
        this.firstValue = '';
        this.setState(
            {
                firstCategoryList: [],
                secondCategoryList: [],
                thirdCategoryList: [],
                rankList: starList,
            },
            () => {
                this.geFirstCategoryList();
            }
        );
    };

    /**
     * 获得一级分类数据
     */
    geFirstCategoryList() {
        const params = { categoryType: 1 };
        req({
            method: 'post',
            data: params,
            url: apiName.getInterviewCategory,
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    let list = res.data.map((item, index) => {
                        return {
                            ...item,
                            active: index == 0 ? true : false,
                        };
                    });
                    this.setState(
                        {
                            firstCategoryList: list,
                            secondCategoryList: [],
                            thirdCategoryList: [],
                        },
                        () => {
                            this.firstValue = list[0].categoryId;
                            this.getSecondCategoryList(this.firstValue);
                            this.getThirdCategoryList(this.firstValue);
                        }
                    );
                } else {
                    this.setState({
                        firstCategoryList: [],
                        secondCategoryList: [],
                        thirdCategoryList: [],
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    /**
     * 获得二级分类数据
     * @param {*} id 一级分类id
     */
    getSecondCategoryList(id) {
        const params = { parentId: id, categoryType: 2 };
        req({
            method: 'post',
            data: params,
            url: apiName.getInterviewCategory,
        })
            .then((res) => {
                this.firstCategoryValue = id;
                this.secondCategoryValue = [];
                this.thirdCategoryValue = [];
                if (res.data && res.data.length > 0) {
                    this.setState({
                        secondCategoryList: res.data,
                    });
                } else {
                    // 若需要新增时，则需要将数组第一个item，重置如下
                    this.setState({
                        secondCategoryList: [{ categoryName: '空', categoryId: -9999 }],
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    /**
     * 获得三级分类数据
     * @param {*} id 二级分类id
     */
    getThirdCategoryList(id) {
        const { subjectName } = this.props;
        const params = {
            primaryCategoryId: id || this.firstValue,
            subjectName: subjectName,
        };
        req({
            method: 'post',
            data: params,
            url: apiName.getRecommendLabel,
        })
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    let list = res.data.map((item) => {
                        return {
                            categoryName: item.labelName,
                            categoryId: item.labelId,
                            active: item?.isRecommend === 1 ? true : false,
                        };
                    });
                    this.thirdCategoryValue = this.formatList(list);
                    if (this.thirdCategoryValue.length >= 0) {
                        this.onChangeRankLabel();
                    }
                    this.setState({
                        thirdCategoryList: list,
                    });
                } else {
                    // 若需要新增时，则需要将数组第一个item，重置如下
                    this.setState({
                        thirdCategoryList: [{ categoryName: '空', categoryId: -9999 }],
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    /**
     * 选择职级-单选
     * @param {*} handleStatusList
     * @param {*} selectList
     */
    onHandleChangeRank = (handleStatusList, selectList) => {
        this.setState({ rankList: handleStatusList });
        this.props.handleChangeRank(selectList);
    };

    /**
     * 选择一级分类-单选
     * @param {*} handleStatusList 带有是否选中状态的原数组
     * @param {*} selectList 选中id的数组
     */
    onChangeFirst = (handleStatusList, selectList) => {
        this.setState({ firstCategoryList: handleStatusList });
        this.firstValue = selectList[0];
        // 获得二级分类
        this.getSecondCategoryList(this.firstValue);
        // 获得三级标签
        this.getThirdCategoryList(this.firstValue);
    };

    /**
     * 选择二级分类
     * @param {*} handleStatusList 带有是否选中状态的原数组
     * @param {*} selectList 选中id的数组
     */
    onChangeSecondTags = (handleStatusList, selectList) => {
        this.secondCategoryValue = selectList;
        this.setState({ secondCategoryList: handleStatusList });
        this.onChangeRankLabel();
    };

    /**
     * 选择三级标签
     * @param {*} handleStatusList 带有是否选中状态的原数组
     * @param {*} selectList 选中id的数组
     */
    onChangeThirdTags = (handleStatusList, selectList) => {
        this.thirdCategoryValue = selectList;
        this.setState({ thirdCategoryList: handleStatusList });
        this.onChangeRankLabel();
    };

    /**
     * 格式化数据-获得选中项id列表
     * @param {*} list
     * @returns
     */
    formatList = (list) => {
        let labelList = [];
        list.forEach((item) => {
            if (item.active) {
                labelList.push(item.categoryId);
            }
        });
        return labelList;
    };

    /**
     * 向父组件传递
     */
    onChangeRankLabel = () => {
        console.log(
            '问答题 -------',
            this.firstCategoryValue,
            this.secondCategoryValue,
            this.thirdCategoryValue
        );
        this.props.onChangeRankLabel(
            this.firstCategoryValue,
            this.secondCategoryValue,
            this.thirdCategoryValue
        );
    };



    /**
     * 职级选择
     * @param {*} rankList
     * @returns
     */
    rendeRrankModule = (rankList) => {
        return (
            <div className="upload-single-container">
                <div className="upload-single-title">职级选择：</div>
                <div className="upload-single-main">
                    <TagsEditor
                        categoryList={rankList}
                        isSingleChoice={true}
                        onChangeLabel={this.onHandleChangeRank}
                        isDisabledReverseSelection={true}
                    />
                    <span style={{ marginLeft: '8px', color: 'red' }}>
                        注：所选职级应为熟练掌握该题的最低职级
                    </span>
                </div>
            </div>
        );
    };

    /**
     * 一级分类选择
     * @param {*} firstCategoryList
     * @returns
     */
    renderFirstModule = (firstCategoryList) => {
        return (
            <Fragment>
                {firstCategoryList?.length > 0 && (
                    <div className="upload-single-container">
                        <div className="upload-single-title">一级分类：</div>
                        <div className="upload-single-main">
                            <TagsEditor
                                categoryList={firstCategoryList}
                                isSingleChoice={true}
                                onChangeLabel={this.onChangeFirst}
                                isDisabledReverseSelection={true}
                            />
                        </div>
                    </div>
                )}
            </Fragment>
        );
    };

    /**
     * 二级分类选择
     * @param {*} secondCategoryList
     * @returns
     */
    renderSecondModule = (secondCategoryList) => {
        return (
            <div className="upload-single-container">
                <div className="upload-single-title">二级分类：</div>
                <div className="upload-single-main">
                    <TagsEditor
                        moduleType={ModuleType.second}
                        categoryList={secondCategoryList}
                        isSingleChoice={false}
                        onChangeLabel={this.onChangeSecondTags}
                    // parentCategoryValue={[this.firstCategoryValue]}
                    // isAddTag={true}
                    // isDeleteTag={true}
                    />
                </div>
            </div>
        );
    };

    /**
     * 三级标签选择
     * @param {*} thirdCategoryList
     * @returns
     */
    renderThirdModule = (thirdCategoryList) => {
        return (
            <div className="upload-single-container">
                <div className="upload-single-title">三级标签：</div>
                <div className="upload-single-main">
                    <TagsEditor
                        moduleType={ModuleType.third}
                        categoryList={thirdCategoryList}
                        isSingleChoice={false}
                        onChangeLabel={this.onChangeThirdTags}
                    // parentCategoryValue={[this.firstCategoryValue]}
                    // isAddTag={true}
                    // isDeleteTag={true}
                    />
                </div>
            </div>
        );
    };

    render() {
        const { firstCategoryList, secondCategoryList, thirdCategoryList, rankList } = this.state;
        return (
            <Fragment>
                {this.rendeRrankModule(rankList)}
                {this.renderFirstModule(firstCategoryList)}
                {secondCategoryList?.length > 0 && (
                    <Fragment>
                        {this.renderSecondModule(secondCategoryList)}
                        {thirdCategoryList?.length > 0 && this.renderThirdModule(thirdCategoryList)}
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

