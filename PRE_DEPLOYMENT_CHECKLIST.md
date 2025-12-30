# Pre-Deployment Checklist

## Environment & Configuration

- [ ] All environment variables configured in production hosting (Vercel/Railway)
- [ ] MongoDB Atlas connection string tested and working
- [ ] Database indexes created for optimal query performance
- [ ] Production `.env` file secured (not committed to git)
- [ ] CORS origins updated for production domain
- [ ] Rate limiting appropriately configured
- [ ] Razorpay production keys verified and tested

## Security

- [ ] SSL certificate configured and verified
- [ ] Helmet.js security headers enabled
- [ ] Environment secrets rotated (JWT_SECRET, etc.)
- [ ] SQL injection protection verified (mongo-sanitize)
- [ ] XSS protection enabled
- [ ] CSRF protection for state-changing operations
- [ ] File upload restrictions in place (type, size)

## Payment Integration

- [ ] Razorpay production account activated
- [ ] Test payment completed successfully
- [ ] Webhook endpoints configured for payment notifications
- [ ] Payment failure handling tested
- [ ] Refund process documented and tested

## Infrastructure

- [ ] Domain DNS configured (A/CNAME records)
- [ ] CDN configured for static assets
- [ ] Database backups scheduled (daily recommended)
- [ ] Error tracking service enabled (Sentry recommended)
- [ ] Uptime monitoring configured (UptimeRobot/Pingdom)
- [ ] Log aggregation service configured

## Email & Notifications

- [ ] SMTP credentials configured and tested
- [ ] Order confirmation emails working
- [ ] Password reset emails working
- [ ] Welcome emails working
- [ ] Email templates reviewed for branding
- [ ] Unsubscribe links functional

## Performance

- [ ] Frontend build optimized (`npm run build` successful)
- [ ] Image optimization enabled (Next.js Image component)
- [ ] Code splitting verified
- [ ] CDN caching headers configured
- [ ] Database query performance tested under load
- [ ] API response times acceptable (<500ms average)

## Testing

- [ ] Manual smoke test completed (registration → checkout)
- [ ] Admin panel tested (product management, order viewing)
- [ ] Mobile experience tested on real devices (iOS Safari, Android Chrome)
- [ ] Payment flow tested end-to-end with real transaction
- [ ] Error pages tested (404, 500)
- [ ] Browser compatibility verified (Chrome, Safari, Firefox, Edge)

## Monitoring & Analytics

- [ ] Health check endpoint accessible (`/api/health`)
- [ ] Google Analytics 4 configured
- [ ] Vercel Analytics enabled
- [ ] Error rate monitoring active
- [ ] Database connection monitoring active
- [ ] Custom alerts configured (downtime, error spikes)

## Documentation

- [ ] README.md updated with production setup instructions
- [ ] API documentation current
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Emergency rollback procedure documented
- [ ] Customer support contact information updated

## Legal & Compliance

- [ ] Privacy Policy reviewed and current
- [ ] Terms of Service reviewed and current
- [ ] Cookie consent implemented (if required)
- [ ] GDPR compliance verified (if applicable)
- [ ] Return/refund policy documented and accessible

## Post-Deployment (Week 1)

- [  ] Monitor error rates (target: <0.5%)
- [ ] Verify payment processing working correctly
- [ ] Check page load times (target: <3s)
- [ ] Monitor database performance
- [ ] Review user feedback
- [ ] Check email deliverability rates
- [ ] Verify all scheduled tasks running (backups, etc.)
- [ ] Security scan completed

## Rollback Plan

- [ ] Previous working build tagged in git
- [ ] Rollback procedure tested
- [ ] Database migration rollback scripts ready
- [ ] Emergency contact list prepared (hosting, payment gateway support)

---

**Deployment Sign-Off:**

- Date: _______________
- Deployed By: _______________
- Environment: Production
- Git Commit: _______________
- Build Version: _______________

**Notes:**
