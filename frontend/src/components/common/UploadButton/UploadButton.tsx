import React from "react";
import ImageUploading, { type ImageListType } from "react-images-uploading";
import './uploadButton.styles.css';

export function UploadButton() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;

    const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
    ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
    };

    return (
    <div className="UploadButton">
        <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        >
        {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
        }) => (
            <div>
            {/* Hides the button if an image is uploaded */}
            {images.length === 0 && (
            <button className="customUploadButton"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
            >
                Upload Image
            </button>
            )}
            &nbsp;
            {imageList.map((image, index) => (
                <div key={index} className="image-item">
                <img className="uploadedImg" src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                    <button className="customUpdateButton" onClick={() => onImageUpdate(index)}>Update</button>
                    <button className="customRemoveButton" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
                </div>
            ))}
            </div>
        )}
        </ImageUploading>
    </div>
    );
}
