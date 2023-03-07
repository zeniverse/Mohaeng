import styles from "./RegisterReview.module.css";

export default function RegisterReview() {
  return (
    <>
      <section className={styles.registerReview}>
        <h2 className={styles.h2}>리뷰 작성</h2>
        <article className={styles.reviewEditForm}>
          <p>선택한 여행지 이름 </p>
          <span>별점 구현 </span>
          <p>리뷰내용</p>
          <form className={styles.form} action="POST">
            <textarea
              className={styles.formTxtArea}
              name="review"
              id="review"
              placeholder="당신의 경험을 공유해보세요!"
            ></textarea>
            <input
              type="file"
              accept="image/*"
              name="file"
              required
              // onChange={handleChange}
            />
            {/* {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="local file"
              />
            )} */}
            <button>등록</button>
            <button>취소</button>
          </form>
        </article>
      </section>
    </>
  );
}
