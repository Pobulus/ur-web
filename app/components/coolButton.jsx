import styles from "../../styles/inputs.module.css";

function CoolButton({ placeholder, disabled, children, onClick, type = 'text' }) {
    return (
      <>
        <div className={styles.inputContainer}>
    <button
      className={styles.input}
      name="text"
      type={type}
      placeholder={placeholder}
      onClick={onClick} 
      disabled={disabled}
    >{children}</button>
  </div>
  
      </>
    );
  }
  export default CoolButton;