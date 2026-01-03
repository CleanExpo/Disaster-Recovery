# Domain Configuration - disasterrecoverynrpg.com.au
**Date**: 2025-12-29
**Domain**: disasterrecoverynrpg.com.au
**Status**: ✅ **ADDED TO VERCEL** - DNS Configuration Required

---

## ✅ STEP 1: DOMAIN ADDED TO VERCEL (COMPLETE)

**Vercel Project**: unite-group/disaster-recovery
**Domain**: disasterrecoverynrpg.com.au
**Status**: Added successfully

---

## 🔧 STEP 2: CONFIGURE DNS RECORDS (REQUIRED)

You need to add DNS records with your domain registrar (whoever you purchased disasterrecoverynrpg.com.au from).

### **Recommended Configuration (A Record)**:

**Go to your domain registrar's DNS management panel** and add:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | **@** | **76.76.21.21** | 3600 |

**What this means**:
- **Type: A** - Points domain to an IP address
- **Name: @** - Root domain (disasterrecoverynrpg.com.au)
- **Value: 76.76.21.21** - Vercel's IP address
- **TTL: 3600** - Time to live (1 hour)

---

### **Alternative: CNAME Record** (For subdomains like www):

If you want **www.disasterrecoverynrpg.com.au** to also work:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **CNAME** | **www** | **cname.vercel-dns.com** | 3600 |

---

## 📋 COMMON DOMAIN REGISTRARS

### If your domain is with **GoDaddy**:
1. Log in to GoDaddy account
2. Go to "My Products" → "Domains"
3. Click "DNS" next to disasterrecoverynrpg.com.au
4. Click "Add" → Select "A" record
5. Name: `@`
6. Value: `76.76.21.21`
7. TTL: Auto or 1 hour
8. Save

### If your domain is with **Namecheap**:
1. Log in to Namecheap
2. Dashboard → Domain List → Manage
3. Advanced DNS tab
4. Add New Record → A Record
5. Host: `@`
6. Value: `76.76.21.21`
7. TTL: Automatic
8. Save

### If your domain is with **Cloudflare**:
1. Log in to Cloudflare
2. Select domain: disasterrecoverynrpg.com.au
3. DNS → Records
4. Add record → Type: A
5. Name: `@`
6. IPv4 address: `76.76.21.21`
7. Proxy status: DNS only (gray cloud) [Important for Vercel]
8. Save

### If your domain is with **Melbourne IT** or **Crazy Domains** (Australian):
1. Log in to your account
2. Manage domain → DNS settings
3. Add A record
4. Name/Host: `@` or leave blank
5. Points to: `76.76.21.21`
6. Save changes

---

## ⏱️ DNS PROPAGATION TIME

**How Long It Takes**:
- **Minimum**: 5-10 minutes
- **Typical**: 1-2 hours
- **Maximum**: 24-48 hours (rare)

**Vercel will**:
- Automatically verify DNS configuration
- Provision SSL certificate (free, automatic)
- Send email when domain is ready

---

## ✅ STEP 3: VERIFY DOMAIN CONFIGURATION

**After adding DNS records**, you can check status:

```bash
# Check domain status in Vercel
vercel domains ls

# Verify DNS propagation
nslookup disasterrecoverynrpg.com.au

# Or use online tool:
# https://dnschecker.org/#A/disasterrecoverynrpg.com.au
```

**Expected Result**:
```
disasterrecoverynrpg.com.au
Address: 76.76.21.21
```

---

## 🔒 STEP 4: SSL CERTIFICATE (AUTOMATIC)

**Vercel will automatically**:
1. Detect your DNS configuration
2. Provision SSL certificate (Let's Encrypt)
3. Enable HTTPS
4. Redirect HTTP → HTTPS

**No action required** - SSL is automatic!

---

## 🌐 STEP 5: VERIFY PRODUCTION SITE

**Once DNS propagates** (check email from Vercel):

1. **Visit**: https://disasterrecoverynrpg.com.au
2. **Verify**:
   - ✅ Site loads correctly
   - ✅ HTTPS (padlock icon in browser)
   - ✅ All pages work
   - ✅ Images display
   - ✅ Phone: 1300 309 361
   - ✅ Email: nrpg.team@gmail.com

---

## 📊 CURRENT STATUS

**Vercel Deployment**: ✅ Ready
- Latest URL: https://disaster-recovery-96cophjn1-unite-group.vercel.app

**Custom Domain**: ⏸️ DNS Configuration Required
- Domain: disasterrecoverynrpg.com.au
- Status: Added to Vercel, awaiting DNS
- Required: A record → 76.76.21.21

**Once DNS Configured**:
- ✅ https://disasterrecoverynrpg.com.au will be your production URL
- ✅ SSL certificate auto-provisioned
- ✅ HTTP→HTTPS redirect automatic

---

## 🎯 WHAT YOU NEED TO DO NOW

1. **Find out who manages your domain** (GoDaddy, Namecheap, Cloudflare, Melbourne IT, etc.)
2. **Log in to that account**
3. **Go to DNS settings** for disasterrecoverynrpg.com.au
4. **Add A record**:
   - Name: `@`
   - Value: `76.76.21.21`
5. **Save and wait** for DNS propagation (5 min - 2 hours)
6. **Check email** from Vercel confirming domain is ready
7. **Visit** https://disasterrecoverynrpg.com.au

---

## 📞 SUPPORT

**If you need help**:
- Vercel Docs: https://vercel.com/docs/projects/domains
- Vercel Support: https://vercel.com/support

**Common Issues**:
- **DNS not propagating**: Wait longer (up to 48 hours)
- **SSL not working**: Vercel provisions automatically, give it time
- **Domain shows old site**: Clear browser cache, wait for propagation

---

**Your domain is ready to be configured!**

**Next Step**: Add the A record (@ → 76.76.21.21) in your domain registrar's DNS settings.
