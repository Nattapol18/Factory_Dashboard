This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

นี่คือหน้าจอแสดงผลของเว็บแอปตามโจทย์ที่ได้รับ

หน้า dashboard ของเครื่องจักรโรงงานประกอบด้วย
• แสดงภำพของผลิตภัณฑ์: ให้แสดงภาพที่เกี่ยวข้องกับเครื่องจักรหรือผลิตภัณฑ์ที่กำลังตรวจสอบ 
• แสดงชอเครองจกร: ให้แสดงชื่อของเครื่องจักรที่เกี่ยวข้อง 
• แสดงกำรวัดควำมเร็ว (Gauge Speed): ใช้กราฟหรือมิเตอร์เพื่อแสดงความเร็วในการทำงานของเครื่องจักร 
• แสดงรำยละเอยดของเครองจกร: ข้อมูลเกี่ยวกับเครื่องจักร เช่น รุ่น, สถานะการทำงาน เป็นต้น 

ส่วน header จะเป็นวันและเวลาที่บันทึกข้อมูล

นี่คือภาพของ Factory Section และ GaugeChart แประกอบด้วย

![image](https://github.com/user-attachments/assets/3a2d5c5a-8aa4-4ebb-ba2f-c4fd243e5f84)

1. การจำลองสถานะเครื่องจักร
เครื่องจักรแต่ละตัวจะเปลี่ยนสถานะโดยอัตโนมัติทุก ๆ 10–45 วินาที ระหว่าง ทำงาน,หยุดทำงาน,รออการซ่อมบำรุง
เพื่อให้เหมือนกับว่าเครื่องจักรในโรงงานมีการเปลี่ยนแปลงตลอดเวลา เป็นการ จำลองสถานการณ์ในจริง ที่มักเกิดขึ้นในโรงงาน เช่น การหยุดฉุกเฉินหรือการหยุดเพื่อซ่อมเครื่อง
และความเร็วในการทำงานขึ้นอยู่กับสถานะของเครื่องเมื่อสถานะเปลี่ยน ความเร็วของเครื่องก็จะเปลี่ยนตาม
ถ้าเครื่อง “ทำงาน” ความเร็วจะอยู่ในช่วง 40–80% ถ้า “หยุด” หรือ “รอซ่อม” ความเร็วจะลดลงหรือเป็นศูนย์

3. การอัปเดตข้อมูลน้ำหนักและอัตราการผลิต
ทุก ๆ 5 วินาที ระบบจะจำลองให้ น้ำหนักสินค้าบนเครื่องเปลี่ยนแบบสุ่มและ อัตราการผลิตมีโอกาสเพิ่มขึ้นเฉพาะเมื่อเครื่องอยู่ในสถานะ "ทำงาน" เท่านั้น

4. การใช้และเติมวัตถุดิบอัตโนมัติ
จะมีการลดวัตถุดิบในถังตามความเร็วที่กำลังทำงานอยู่ ซึ่งสอดคล้องกับการใช้พลังงาน/ทรัพยากรจริง
หากวัตถุดิบในถังเหลือน้อยกว่า 70% ของความจุสูงสุด ระบบจะจำลองการเติมวัตถุดิบให้เองโดยอัตโนมัติ

6. ใช้ GaugeChart แสดงด้วย PieChart เพื่อจำลองความเร็วในการทำงาน ช่วยให้ผู้ใช้งานสามารถประเมินความเร็วของเครื่องได้ทันที โดยไม่ต้องวิเคราะห์ตัวเลข

เว็บแอปรองรับ responsive

![image](https://github.com/user-attachments/assets/631bf82d-7877-457b-beb6-226ee1686290)
 
หน้า Storage Area ประกอบด้วย
• แสดงการมองเห็นข้อมูล: การแสดงผลในลักษณะของกราฟหรือแผนภูมิที่แสดงข้อมูลที่เกี่ยวข้องกับการเก็บข้อมูล 
• แสดงชื่อของพื้นทเก็บข้อมูล: ชื่อหรือรหัสของพื้นที่เก็บข้อมูล (SemiBatch)
• แสดงระดับของพื้นที่เก็บข้อมูล: ระดับหรือปริมาณที่เก็บได้ในพื้นที่นั้น

นี่คือภาพของ Storage Area ประกอบด้วย

![image](https://github.com/user-attachments/assets/02e5cda1-4753-4c5f-aa5e-dac889c6f2f6)

1. แสดงข้อมูลพื้นฐานที่สำคัญ
เราต้องรู้ว่าแท็งก์ไหนเก็บวัสดุอะไร, มีแท็กระบุชื่ออะไร, น้ำหนักปัจจุบันเท่าไหร่ และอัปเดตล่าสุดเมื่อไหร่ เพราะข้อมูลเหล่านี้เป็นพื้นฐานของการบริหารจัดการวัตถุดิบในโรงงาน เช่น ถ้าจะเติมวัตถุดิบใหม่ ต้องรู้ว่ายังเหลือมากน้อยแค่ไหน

2. มีกราฟแนวโน้มน้ำหนักของวัตถุดิย
การมีกราฟน้ำหนักช่วยให้มองออกทันทีว่า น้ำหนักวัตถุดิบในถังเพิ่มขึ้นหรือลดลงต่อเนื่องหรือไม่ทำให้สามารถคาดการณ์แนวโน้มได้ล่วงหน้า

3. ข้อมูลวัตถุดิบมีการเคลื่อนไหวตลอดเวลา การดึงข้อมูลช่วงเวลาจาก storageData.js ทำให้กราฟสามารถแสดงประวัติการเปลี่ยนแปลงซึ่งเป็นสิ่งสำคัญในการวิเคราะห์ปัญหาและประสิทธิภาพของกระบวนการผลิต หรือการตรวจสอบปัญหาที่อาจเกิดขึ้น

4. จำลองข้อมูลใหม่ทุก 15 วินาที
การเพิ่มข้อมูลอย่างต่อเนื่องช่วยให้กราฟดูมีชีวิต และมีการเปลี่ยนแปลงแบบเรียลไทม์ ทำให้เหมือนว่าระบบกำลังดึงข้อมูลสดจากเซ็นเซอร์จริง

5. คำนวณเปอร์เซ็นต์การเปลี่ยนแปลงจากจุดเริ่มต้น
ระบบบอกได้ว่า ลดลงไปกี่ % หรือเพิ่มขึ้นกี่ % จากตอนแรก ซึ่งช่วยให้ผู้ใช้ตัดสินใจได้รวดเร็วขึ้น เช่น เห็นแล้วรู้เลยว่า “วัตถุดิบลดไป 20% ในชั่วโมงเดียว” = อาจต้องเติมหรือเตรียมผลิตเพิ่ม

เว็บแอปรองรับ responsive

![image](https://github.com/user-attachments/assets/42a75b72-9642-45cc-bcf4-d57709e5d507)



