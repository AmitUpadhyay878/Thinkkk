import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { useForm } from "react-hook-form";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import AmitButton from "../../../Components/AmitButton";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import request from "../../../util/request";
import { toast } from "react-toastify";
import { FailureToastNotification,SuccessToastNotification } from "../../../Components/ToastServerError/ToasterMessage";

const TermsandCondition = () => {
  const {handleSubmit } = useForm({});
  const [editorState, setEditorState] = useState();
  const [disableBtn,setDisableBtn] = useState(false);
    const [currentID,setcurrentID] = useState()
  const onEditorStateChange = (e) => {
    setEditorState(e);
  };

  const customContentStateConverter = (contentState) => {
    // changes block type of images to 'atomic'
    const newBlockMap = contentState.getBlockMap().map((block) => {
      const entityKey = block.getEntityAt(0);
      if (entityKey !== null) {
        const entityBlock = contentState.getEntity(entityKey);
        const entityType = entityBlock.getType();
        switch (entityType) {
          case "IMAGE": {
            const newBlock = block.merge({
              type: "atomic",
              text: "img",
            });
            return newBlock;
          }
          default:
            return block;
        }
      }
      return block;
    });
    const newContentState = contentState.set("blockMap", newBlockMap);
    return newContentState;
  };

  useEffect(() => {
    request("GET", "cms/list", {}, { slug: "terms-and-condition" }, true)
      .then((res) => {
        setcurrentID (res.data.data.cmsId)
        const blocksFromHTML = htmlToDraft(res.data.data.description);
        setEditorState(
          EditorState.createWithContent(
            customContentStateConverter(
              ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
              )
            )
          )
        );
      })
      .catch((err) => <h1>{err}</h1>);
  }, []);

  const onSubmit = async (data) => {
    setDisableBtn(true);
    const payload = {
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      websiteContentType: "terms-and-condition",
    };

    request(
        "POST",
        "cms/edit",
        {cmsId:currentID,title:"Terms and Condition",description:payload.content},
        {},
        true
      )
        .then((res) => {
          if(res.data.meta.status === 0){
            FailureToastNotification(res.data.meta.message)
    }
    else{
      SuccessToastNotification(res.data.meta.message)
    }
        })
        .catch((err) => FailureToastNotification(err));
        setTimeout(()=>{
          setDisableBtn(false)
        },3000)
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="savebtn">
          <AmitButton
           text= {disableBtn? "Please Wait..":"save"}
            commonClass="common-btn"
            addedClass=""
            type="submit"
            isDisabled={disableBtn}
          />
        </div>
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onEditorStateChange={(e) => {
            onEditorStateChange(e);
          }}
        />
      </Form>
    </div>
  );
};

export default TermsandCondition;
