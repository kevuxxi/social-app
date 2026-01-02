import { ClipLoader } from "react-spinners"

const Loader = ({ text = "Cargando..." }) => (
  <div className="ui-loader" aria-live="polite">
    <ClipLoader color="#c7d2fe" size={28} />
    <p>{text}</p>
  </div>
)

export default Loader
