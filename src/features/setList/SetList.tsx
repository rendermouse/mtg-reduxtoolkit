import { useAppDispatch} from "../../app/hooks";
import { useGetSetListQuery } from "./setListAPISlice";
import { setCurrentSetCode } from "../cardList/cardListAPISlice"
import { type JSX } from "react"

const SetList = (): JSX.Element | null => {
  const dispatch = useAppDispatch();

  const { data, isError, isLoading, isSuccess } = useGetSetListQuery('');
  
    if (isError) {
      return (
        <div>
          <h1>There was an error!!!</h1>
        </div>
      )
    }
  
    if (isLoading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
  
    if (isSuccess) {

      return (
          <div className="SetList">
              <h1>Sets</h1>  
              <div className="setListContainer">                          
                  {data.sets.map(({name, code}, index) => (
                      <div
                        className="set"
                        key={index}
                        onClick={() => {
                          console.log('click ' + code);
                          dispatch(setCurrentSetCode(code));
                        }}
                      >
                        {name}
                      </div>
                  ))}
              </div>
          </div>
      );
  }
  return null;
}

export default SetList;