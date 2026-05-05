import React from 'react';
import './style/blogskeleton.scss';

const BlogSkeleton = () => {
  return (
    <div className="blog-view-wrapper">
      <div className="blog-container skeleton-active">
        <header className="blog-header">
          {/* Meta data skeleton */}
          <div className="skeleton skeleton-text skeleton-meta"></div>
          
          {/* Title skeleton */}
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-title short"></div>
          
          {/* Image skeleton */}
          <div className="skeleton skeleton-image"></div>
        </header>

        <div className="blog-layout">
          <main className="blog-main">
            <section className="blog-content-body">
              {/* Paragraph skeletons */}
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text last"></div>
              
              <br />
              
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text last"></div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;