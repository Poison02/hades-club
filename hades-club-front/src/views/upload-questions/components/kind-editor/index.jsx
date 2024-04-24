import React, { Component, useRef } from 'react';
import './index.less';

import Editor from 'wangeditor';

const defaultValueHead = `<div style='font-size:14px !important;line-height:22px !important;margin-bottom: -15px !important;word-break: break-word  !important;'>`;
const defaultValueFoot = '</div>';

// const KindEditor = () => {
//     const menuRef = useRef()
//     const bodyRef = useRef()
//     const editor = new Editor()

// }

export default class KindEditor extends Component {
    editor = Editor;

    constructor(props) {
        super(props);
        this.state = { editorContent: '', isActive: false };
    }

    /**
     * 清空内容
     */
    onClear = () => {
        this.editor.txt.clear();
        this.editor.config.focus = false;
        this.setState({
            isActive: false,
            editorContent: '',
        });
    };

    /**
     * 回现代码
     */
    onCashBack = () => {
        let { cashBackText } = this.props;
        if (!!!cashBackText) {
            return;
        }
        this.editor.txt.html(`${cashBackText}`);
        this.editor.config.focus = true;
    };

    /**
     * 获得焦点
     */
    onFocus = () => {
        this.editor.config.focus = true;
        this.setState({
            isActive: true,
        });
    };

    componentDidMount() {
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        if (this.editor) return
        this.editor = new Editor(elemMenu, elemBody);
        // // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        this.editor.config.onchange = (html) => {
            let htmlStr = this.editor.txt.html();
            // console.log('htmlStr ---', htmlStr);
            if (htmlStr?.indexOf('<div style=') < 0) {
                htmlStr = this.defaultValueHead + htmlStr + this.defaultValueFoot;
            }
            let isActive = false;
            if (this.state.editorContent) {
                isActive = true;
            }
            this.setState(
                {
                    // editorContent: editor.txt.text()
                    editorContent: htmlStr,
                    isActive: isActive,
                },
                () => {
                    this.props.onChange(htmlStr);
                }
            );
        };
        this.editor.config.onfocus = () => {
            this.setState({
                isActive: true,
            });
        };
        this.editor.config.onblur = () => {
            this.setState({
                isActive: false,
            });
        };

        this.editor.config.menus = [
            // 'head', // 标题
            // 'bold', // 粗体
            // 'fontSize', // 字号
            // 'fontName', // 字体
            // 'italic', // 斜体
            // 'underline', // 下划线
            // 'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            // 'backColor', // 背景颜色
            // 'link', // 插入链接
            'list', // 列表
            // 'justify', // 对齐方式
            // 'quote', // 引用
            // 'emoticon', // 表情
            // 'image', // 插入图片
            // 'table', // 表格
            // 'video', // 插入视频
            'code', // 插入代码
            'undo', // 撤销
            // 'redo', // 重复
        ];
        // this.editor.customConfig.uploadImgShowBase64 = true;
        // 取消自动 focus
        this.editor.config.focus = false;
        this.editor.config.pasteFilterStyle = true; // 样式过滤
        this.editor.config.pasteIgnoreImg = true; // 如果复制的内容有图片又有文字，则只粘贴文字，不粘贴图片
        this.editor.config.placeholder = '请输入';
        this.editor.create();
    }

    render() {
        const { isActive } = this.state;
        const { bodyHeight, bodyWidth, borderRadius } = this.props;
        return (
            <div
                className={`text-area ${isActive && 'kind-editor-active-box'}`}
                style={{
                    borderRadius: borderRadius,
                }}>
                <div
                    ref="editorElemMenu"
                    className="editorelem-menu"
                    style={{
                        width: bodyWidth,
                        borderTopLeftRadius: borderRadius,
                        borderTopRightRadius: borderRadius,
                    }}></div>
                <div
                    ref="editorElemBody"
                    className="editorelem-body"
                    style={{
                        height: bodyHeight,
                        width: bodyWidth,
                        borderBottomLeftRadius: borderRadius,
                        borderBottomRightRadius: borderRadius,
                    }}></div>
            </div>
        );
    }
}

KindEditor.defaultProps = {
    bodyHeight: 320,
    bodyWidth: '100%',
    borderRadius: '4px',
};
