import React, { useState, useEffect } from 'react';
import MatrixBackground from './component/MatrixBackground';
// import { Container, Button } from 'react-bootstrap';
import './App.css'; // สำหรับ CSS เพิ่มเติม
import BookComponent from './component/BookComponent';
import TypewriterText from './component/TypewriterText';

// ---------------------------------------------------
// Component: App (จัดการลำดับการแสดงผล)
// ---------------------------------------------------
const messages = ['HAPPY', 'BIRTH', 'DAY', 'TO', 'MYGF', ''];

const App = () => {
  const [showMatrix, setShowMatrix] = React.useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);
  const [showSpaceBackground, setShowSpaceBackground] = React.useState(false);

  // State ใหม่สำหรับการแสดงผลอนิเมชั่นแมว และ Hand/Book
  const [showCatsAnimation, setShowCatsAnimation] = React.useState(false);
  const [showHand, setShowHand] = React.useState(false);
  const [showBook, setShowBook] = React.useState(false);

  const [isPortrait, setIsPortrait] = React.useState(false);

  // const [matrixFinished, setMatrixFinished] = React.useState(false);

  // 1. จัดการการแสดงผล Matrix Rain
  // React.useEffect(() => {
  //   if (showMatrix) {
  //     // กำหนดให้ Matrix ทำงาน 5 วินาที แล้วเริ่มเปลี่ยน
  //     const matrixTimer = setTimeout(() => {
  //       setShowMatrix(false);
  //       setMatrixFinished(true);
  //     }, 9000);

  //     return () => clearTimeout(matrixTimer);
  //   }
  // }, [showMatrix]);
  // ฟังก์ชันตรวจสอบแนวนอน/แนวตั้ง
  const checkOrientation = () => {
    // หากความกว้างน้อยกว่าความสูง แสดงว่าเป็นแนวตั้ง
    if (window.innerWidth < window.innerHeight) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
  };
  // Effect เพื่อตรวจสอบ orientation เมื่อโหลดครั้งแรกและเมื่อมีการ resize
  React.useEffect(() => {
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);
  // 1. จัดการการแสดงข้อความหลักทีละคำ
  React.useEffect(() => {
    if (
      // matrixFinished &&
      !isPortrait && currentMessageIndex < messages.length) {
      // แสดงข้อความถัดไปทุกๆ 1.5 วินาที
      const messageTimer = setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }, 1500);
      return () => clearTimeout(messageTimer);
    }
    // else if (currentMessageIndex === messages.length && matrixFinished) {
    //   // ข้อความครบแล้ว เปลี่ยนไปหน้าพื้นหลังอวกาศ
    //   setShowSpaceBackground(true);
    // }
  }, [
    // matrixFinished,
    currentMessageIndex, isPortrait]);

  // Effect 2: จัดการการเปลี่ยนไปหน้าอนิเมชั่นแมวเมื่อข้อความเสร็จ
  React.useEffect(() => {
    if (currentMessageIndex === messages.length && messages.length > 0) {
      setShowMatrix(false);
      setShowSpaceBackground(true); // เข้าสู่หน้าพื้นหลังอวกาศ
      setShowCatsAnimation(true); // เริ่มแสดงอนิเมชั่นแมว
    }
  }, [currentMessageIndex]);

  // Effect 3: จัดการการเปลี่ยนจากอนิเมชั่นแมวไปแสดงรูปมือ
  React.useEffect(() => {
    if (showCatsAnimation) {
      // ตั้งเวลาแสดงอนิเมชั่นแมว เช่น 4 วินาที ก่อนเปลี่ยนไปแสดงรูปมือ
      const animationTimer = setTimeout(() => {
        setShowCatsAnimation(false);
        setShowHand(true);
      }, 4000);

      return () => clearTimeout(animationTimer);
    }
  }, [showCatsAnimation]);

  const handleHandClick = () => {
    setShowHand(false);
    setShowBook(true);
  };
  // 1. แสดงหน้าจอเตือนให้หมุนโทรศัพท์ หากอยู่ในแนวตั้ง
  if (isPortrait) {
    return (
      <div
        className='d-flex justify-content-center align-items-center flex-column text-center'
        style={{
          backgroundColor: 'black',
          color: '#fff',
          // height: '100vh',

        }}>
        <div className="rotation-prompt">
          <div className="phone-icon">
            {/* <i className="bi bi-phone phone-icon"></i> */}
          </div>
          {/* <p className="message">กรุณาหมุนโทรศัพท์เป็นแนวนอน</p>
          <p className="message">เพื่อให้ได้รับประสบการณ์ที่ดีที่สุด</p> */}
        </div>
        {/* <h1 style={{ fontSize: '2rem' }}>กรุณาหมุนโทรศัพท์เป็นแนวนอน</h1>
                <p style={{ fontSize: '1.2rem' }}>เพื่อประสบการณ์รับชมที่ดีที่สุด</p> */}
        {/* คุณอาจเพิ่ม CSS animation เพื่อให้ไอคอนหมุนเพื่อกระตุ้นให้หมุนโทรศัพท์ */}
      </div>
    );
  }
  // หน้าจอพื้นหลังอวกาศ
  if (showSpaceBackground) {
    return (
      <div className="space-background d-flex justify-content-center align-items-center">
        <div className="stars">
          {/* ใช้ stars-layer และ stars-twinkle เพื่อสร้างดาวและ animation */}
          <div className="stars-layer stars-twinkle"></div>
        </div>
        {showCatsAnimation && (
          // แสดงอนิเมชั่นแมว (ใช้รูปภาพที่คุณให้มา)
          <div style={{ transition: 'opacity 1s ease', zIndex: 10 }}>
            <img
              src="https://bestanimations.com/media/birthday-cats/1429967726funny-cat-sunglasses-happy-birthday-gif.gif" // เปลี่ยนเป็น URL รูปแมวที่ถูกต้อง
              alt="Birthday Animation"
              className="img-fluid"
              style={{ maxWidth: '600px' }}
            />
          </div>
        )}
        {showHand && (
          // แสดงรูปมือ รอการแตะ
          <div onClick={handleHandClick} style={{ cursor: 'pointer', zIndex: 10 }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTaYXMxz9PVHWoGu_eUQUea_3NOYQXh2cinA&s"
              alt="Tap to open"
              className="img-fluid"
              style={{ maxWidth: '300px', transition: 'opacity 0.5s', opacity: 0.9 }}
            />
            {/* <p className="text-white mt-3" style={{ fontSize: '1.2rem' }}>แตะเพื่อเปิดหนังสือ</p> */}
          </div>
        )}
        {showBook && (
          // แสดง BookComponent เมื่อหนังสือถูกเปิด

          <div style={{ zIndex: 10 }}>
            <BookComponent />
          </div>
        )}

        {/* ใช้ Bootstrap classes: d-flex, flex-column, align-items-center, justify-content-center */}
        {/* <div className="d-flex flex-column align-items-center justify-content-center h-100 p-4">
          <img src="https://via.placeholder.com/400x300.png?text=BOOK+IMAGE" alt="หนังสือเล่มใหญ่" className="book-image" />
          <h1 className="mt-4 text-white">เรื่องราวเริ่มต้นขึ้นแล้ว!</h1>
          <button type="button" className="btn btn-primary btn-lg mt-3" onClick={() => alert('ปุ่มถูกกดแล้ว!')}>
            เริ่มต้น
          </button>
        </div> */}
      </div>
    );
  }

  // หน้าจอแสดง Matrix และข้อความ
  return (
    <div className="app-container">
      <MatrixBackground isVisible={showMatrix} />

      <div className="message-container">
        {currentMessageIndex > 0 && currentMessageIndex <= messages.length && (
          <h1
            // ใช้ key={currentMessageIndex - 1} เพื่อให้ React รู้จัก element นี้
            key={currentMessageIndex - 1}
            className={`message-text pink-happy `}
          >
            {messages[currentMessageIndex - 1]}
          </h1>
        )}
        {/* {messages.slice(0, currentMessageIndex).map((msg, index) => (
          
          <h1
            key={index}
            className={`message-text ${msg === 'HAPPY' ? 'pink-happy' : ''}`}
          >
            {msg}
          </h1>
        ))} */}
      </div>
    </div>
  );
};

export default App;