# Performance Optimization Guide

## Overview

This guide covers performance optimization strategies for the Olive-Edge platform.

## Frontend Performance

### 1. Lighthouse Audit

Run Lighthouse audit:

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit on production build
npm run build
npm run start

# In another terminal
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

**Target Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### 2. Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.mjs:
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  // your config
});

# Run analysis
ANALYZE=true npm run build
```

**Optimization Strategies:**
- Code splitting by route
- Lazy load heavy components
- Tree-shake unused code
- Minimize third-party scripts

### 3. Image Optimization

**Already Implemented:**
- Next.js Image component
- Automatic format optimization (WebP)
- Responsive images

**Recommendations:**
- Use appropriate image sizes
- Implement blur placeholders
- Lazy load below-the-fold images

### 4. Web Vitals Monitoring

**Metrics to Track:**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

**Monitor with:**
- Vercel Analytics (post-deployment)
- Google Analytics 4 Web Vitals
- Real User Monitoring (RUM)

---

## Backend Performance

### 1. Database Optimization

**MongoDB Indexes:**

```javascript
// Product indexes
productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ category: 1, inStock: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ name: 'text', description: 'text' });

// Order indexes
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ isPaid: 1 });
orderSchema.index({ orderStatus: 1 });

// User indexes
userSchema.index({ email: 1 }, { unique: true });
```

**Query Optimization:**
- Use projection to limit returned fields
- Implement pagination
- Use aggregation pipeline efficiently
- Monitor slow queries

### 2. Caching Strategy

**Redis Integration (Optional):**

```javascript
import redis from 'redis';

const client = redis.createClient({
  url: process.env.REDIS_URL
});

// Cache product listings
const getProducts = async (query) => {
  const cacheKey = `products:${JSON.stringify(query)}`;
  
  // Check cache
  const cached = await client.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // Fetch from database
  const products = await Product.find(query);
  
  // Store in cache (10 minutes)
  await client.setEx(cacheKey, 600, JSON.stringify(products));
  
  return products;
};
```

### 3. API Response Optimization

**Compression:**
Already implemented with `compression` middleware.

**Response Size:**
- Minimize nested data
- Use pagination
- Remove unnecessary fields

---

## Network Optimization

### 1. CDN Configuration

**Cloudinary (Images):**
- Already configured
- Automatic optimization
- Global CDN delivery

**Vercel (Frontend):**
- Edge network caching
- Automatic static asset optimization
- Gzip/Brotli compression

### 2. HTTP/2 & HTTP/3

Automatically enabled on Vercel and most hosting platforms.

---

## Monitoring & Profiling

### 1. Performance Monitoring Tools

**Backend:**
- New Relic / DataDog (optional)
- Custom health endpoint (implemented)
- Winston logging (implemented)

**Frontend:**
- Vercel Analytics
- Google Analytics Web Vitals
- Chrome DevTools Performance tab

### 2. Error Tracking

**Sentry Integration** (optional):
See deployment guide for setup instructions.

---

## Load Testing

### Artillery (Recommended)

```bash
npm install -g artillery

# Create test scenario
artillery quick --count 10 --num 100 http://localhost:5001/api/products

# Expected: < 500ms average response time
```

### k6 (Alternative)

```javascript
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function() {
  let res = http.get('http://localhost:5001/api/products');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

---

## Performance Checklist

### Frontend
- [ ] Lighthouse score > 90 on all metrics
- [ ] Bundle size analyzed and optimized
- [ ] Images optimized and lazy loaded
- [ ] Web Vitals within targets
- [ ] Code splitting implemented
- [ ] Third-party scripts minimized

### Backend
- [ ] Database indexes created
- [ ] Query performance optimized
- [ ] Compression enabled
- [ ] Response times < 500ms average
- [ ] Logging configured
- [ ] Health monitoring active

### Infrastructure
- [ ] CDN configured
- [ ] Caching strategy implemented
- [ ] Load testing completed
- [ ] Monitoring tools active
- [ ] Error tracking enabled

---

## Continuous Optimization

**Monthly:**
- Review analytics for slow pages
- Check database query performance
- Update dependencies
- Review bundle size

**Quarterly:**
- Full performance audit
- Load testing under peak traffic
- Review and optimize slow endpoints
- Update optimization strategies
