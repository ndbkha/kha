const express = require("express");
const fs = require("fs");
const PptxGenJS = require("pptxgenjs");

const app = express();
const port = 3000;

app.get("/download-ppt", async (req, res) => {
    let pptx = new PptxGenJS();

    // Tạo một slide
    let slide = pptx.addSlide();
    slide.addText("Chào mừng bạn đến với bài trình chiếu!", { x: 1, y: 1, fontSize: 24 });

    // Định nghĩa tên file
    const fileName = "presentation.pptx";
    
    // Lưu file vào buffer và gửi về client
    pptx.write("nodebuffer").then((buffer) => {
        res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
        res.send(buffer);
    });
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
