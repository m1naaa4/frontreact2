import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function CreateArticlePage() {

    return (
        <div className="Page-Wrapper mt-4">
            <div className="container create-article">
                <h3 className='main-heading'>Create a new article</h3>
                <div className="row">
                    <div className="col-md-12 col-lg-9">
                        <form>
                            <div className="col-md-12 input-row">
                                <input className="title-input" type="text" name="title" placeholder='Article Title' />
                            </div>
                            <div className="form-inputs">
                                <div className="col-md-12 input-row">
                                    <ReactQuill id="editor" theme="snow" name="description" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-12 col-lg-3">
                        <div className='row'>
                            <div className="col-md-12 d-flex flex-column sidebar">
                                <h4 className="sidebar-title">Publish</h4>
                                <p><span>Status: </span> <b>Draft</b> <button className='edit-btn' onClick={() => { }}><i class="uil uil-pen"></i>edit</button></p>
                                <p><span>Visibility: </span> <b>Public</b> <button className='edit-btn' onClick={() => { }}><i class="uil uil-pen"></i>edit</button></p>
                                <p><span>Publish: </span> <b>Immediately</b> <button className='edit-btn' onClick={() => { }}><i class="uil uil-pen"></i>edit</button></p>
                                <div className='d-flex justify-content-around'>
                                    <button className='action-btn' onClick={() => { }}><i class="uil uil-file-bookmark-alt"></i>Draft</button>
                                    <button className='action-btn' onClick={() => { }}><i class="uil uil-eye"></i>Preview</button>
                                    <button className='action-btn' onClick={() => { }}><i class="uil uil-share"></i>Publish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}