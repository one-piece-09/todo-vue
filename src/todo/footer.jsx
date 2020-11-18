import '../assets/styles/footer.css'

export default {
  data() {
    return {
      author: 'Jie'
    }
  },
  render() {
    return (
      <div id="footer">
        <span>Written by { this.author }</span>
      </div>
    )
  }
}