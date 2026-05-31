import React, { useState, useRef, useEffect } from 'react';

import { listService } from '_services/list.service';

const CATEGORY_LABELS = {
  book: 'Books',
  movie: 'Movies & TV',
  music: 'Music',
};
const CATEGORY_ORDER = ['book', 'movie', 'music'];

// ItemSearchField is the "Item name" input, upgraded to a search-as-you-type box
// that queries external catalogs (books / movies & TV / music). Selecting a
// result autofills the Formik `name`, `url` and `pic_url` fields. Typing freely
// (without selecting) still works — the backend then falls back to og:image.
function ItemSearchField({ value, setFieldValue }) {
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  // Close the dropdown when clicking outside.
  useEffect(() => {
    const onClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const runSearch = (query) => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    listService.searchExternal(query)
      .then((res) => {
        setResults(res || []);
        setOpen(true);
      })
      .catch(() => {
        setResults([]);
      })
      .finally(() => setLoading(false));
  };

  const onChange = (e) => {
    const next = e.target.value;
    setFieldValue('name', next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(next), 300);
  };

  const onSelect = (result) => {
    setFieldValue('name', result.name);
    setFieldValue('url', result.url || '');
    setFieldValue('pic_url', result.pic_url || '');
    setFieldValue('description', result.description || '');
    setOpen(false);
    setResults([]);
    // For books, lazily upgrade the author+year placeholder to the full
    // Open Library synopsis (one extra fetch, only for the selected item).
    if (result.category === 'book' && result.url) {
      listService.bookDescription(result.url)
        .then((desc) => { if (desc) setFieldValue('description', desc); })
        .catch(() => { /* keep the placeholder description */ });
    }
  };

  const grouped = CATEGORY_ORDER
    .map((cat) => ({ cat, items: results.filter((r) => r.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <input
        className="form-control form-control-alternative"
        name="name"
        placeholder="Search a book, movie or album… or type a name"
        type="text"
        autoComplete="off"
        value={value}
        onChange={onChange}
        onFocus={() => { if (results.length > 0) setOpen(true); }}
      />
      {open && (loading || grouped.length > 0) && (
        <div
          className="dropdown-menu show shadow w-100"
          style={{ maxHeight: '320px', overflowY: 'auto', position: 'absolute', zIndex: 1000 }}>
          {loading && grouped.length === 0 && (
            <span className="dropdown-item-text text-muted">Searching…</span>
          )}
          {grouped.map((group) => (
            <React.Fragment key={group.cat}>
              <h6 className="dropdown-header">{CATEGORY_LABELS[group.cat]}</h6>
              {group.items.map((result, idx) => (
                <button
                  key={group.cat + idx}
                  type="button"
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => onSelect(result)}
                  style={{ whiteSpace: 'normal' }}>
                  {result.pic_url
                    ? <img
                        src={result.pic_url}
                        alt=""
                        style={{ width: '32px', height: '48px', objectFit: 'cover', marginRight: '12px', flexShrink: 0 }} />
                    : <span style={{ width: '32px', height: '48px', marginRight: '12px', flexShrink: 0 }} />}
                  <span>
                    <strong className="d-block">{result.name}</strong>
                    {result.description &&
                      <small className="text-muted">{result.description}</small>}
                  </span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemSearchField;
