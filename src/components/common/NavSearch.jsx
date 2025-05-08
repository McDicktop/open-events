import { useState } from "react";
import { getEvents } from "../../services/event.api";

import { useDispatch } from "react-redux";
import { updateEvents } from "../../features/eventsSlice";

import SearchIcon from "../../assets/SearchIcon";
import FilterIcon from "../../assets/FilterIcon";

function NavSearch() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const submit = async () => {
    // const res = await getEvents(`?find=${search}`);
    // dispatch(updateEvents(res));
  };

  return (
    <div className="flex items-center justify-center px-4 py-2 gap-2 rounded-full border border-gray-300 text-md">


      <FilterIcon className="w-6 h-6 cursor-pointer" strokeWidth="3" />

      <input
        className={`text-sm outline-none`}
        type={"text"}
        value={search}
        placeholder={"type to search events..."}
        onChange={handleChange}
        id={"search_event"}
      />

      <div onClick={() => submit()}>
        <SearchIcon className="w-6 h-6 cursor-pointer" strokeWidth="3" />
      </div>

    </div>
  );
}

export default NavSearch;
